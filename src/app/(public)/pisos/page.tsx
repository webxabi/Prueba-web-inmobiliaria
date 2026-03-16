import db from '@/lib/db';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PisosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q as string;
  const minPrice = params.minPrice as string;
  const maxPrice = params.maxPrice as string;
  const rooms = params.rooms as string;
  const bathrooms = params.bathrooms as string;

  let query = 'SELECT * FROM properties WHERE 1=1';
  const queryParams: any[] = [];

  if (q) {
    query += ' AND (name LIKE ? OR description LIKE ? OR location LIKE ?)';
    queryParams.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (minPrice) {
    query += ' AND price >= ?';
    queryParams.push(minPrice);
  }
  if (maxPrice) {
    query += ' AND price <= ?';
    queryParams.push(maxPrice);
  }
  if (rooms) {
    query += ' AND rooms >= ?';
    queryParams.push(rooms);
  }
  if (bathrooms) {
    query += ' AND bathrooms >= ?';
    queryParams.push(bathrooms);
  }

  query += ' ORDER BY created_at DESC';

  let properties = [];
  try {
    properties = db.prepare(query).all(...queryParams) as any[];
  } catch (e) {
    properties = [];
  }

  return (
    <div className="container py-16">
      <h1 className="h1 mb-8">Nuestras Propiedades</h1>
      
      <PropertyFilters />

      {properties.length > 0 ? (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)' }}>
          <p className="text-lg text-muted">No se encontraron propiedades con esos filtros.</p>
        </div>
      )}
    </div>
  );
}

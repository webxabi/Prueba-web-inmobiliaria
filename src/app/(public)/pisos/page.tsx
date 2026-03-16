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
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - 100px)'}}>
      <div className="container py-16">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="material-symbols-outlined text-accent">search</span>
          <h1 className="h1" style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: 'var(--color-primary)' }}>Nuestras Propiedades</h1>
        </div>
        <p className="text-muted" style={{ marginBottom: '3rem', fontSize: '1.125rem' }}>Explora nuestro catálogo completo y filtra para encontrar tu hogar ideal.</p>
        
        <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', marginBottom: '3rem' }}>
          <PropertyFilters />
        </div>

        {properties.length > 0 ? (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '6rem 0', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--color-border)', marginBottom: '1rem' }}>sentiment_dissatisfied</span>
            <p className="text-lg text-muted">No se encontraron propiedades con esos filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}

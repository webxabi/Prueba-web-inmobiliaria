import { Metadata } from 'next';
import supabase from '@/lib/supabase';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';

export const metadata: Metadata = {
  title: 'Propiedades en venta',
};

export const dynamic = 'force-dynamic';

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

  let properties = [];
  try {
    let query = supabase.from('properties').select('*').order('created_at', { ascending: false });

    if (q) {
      // Using Supabase or/ilike for text search
      query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,location.ilike.%${q}%`);
    }
    if (minPrice) {
      query = query.gte('price', parseInt(minPrice));
    }
    if (maxPrice) {
      query = query.lte('price', parseInt(maxPrice));
    }
    if (rooms) {
      query = query.gte('rooms', parseInt(rooms));
    }
    if (bathrooms) {
      query = query.gte('bathrooms', parseInt(bathrooms));
    }

    const { data, error } = await query;
    if (error) throw error;
    properties = data || [];
  } catch (e) {
    console.error("Error fetching filtered properties from Supabase:", e);
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

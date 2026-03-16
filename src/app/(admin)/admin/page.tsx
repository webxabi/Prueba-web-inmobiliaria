import db from '@/lib/db';
import Link from 'next/link';

async function getProperties() {
  try {
    return db.prepare('SELECT id, name, price, status, featured, created_at FROM properties ORDER BY created_at DESC').all() as any[];
  } catch (e) {
    return [];
  }
}

export default async function AdminDashboard() {
  const properties = await getProperties();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--color-primary)' }}>Gestión de Propiedades</h1>
        <Link href="/admin/property/new" className="btn btn-primary" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)' }}>+ Nuevo Inmueble</Link>
      </div>

      <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th style={{ padding: '1rem' }}>Nombre</th>
              <th style={{ padding: '1rem' }}>Precio</th>
              <th style={{ padding: '1rem' }}>Estado</th>
              <th style={{ padding: '1rem' }}>Destacado</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No hay propiedades dadas de alta.
                </td>
              </tr>
            ) : properties.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem' }}>#{p.id}</td>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{p.name}</td>
                <td style={{ padding: '1rem' }}>{p.price} €</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: p.status === 'disponible' ? '#C6F6D5' : '#FED7D7', color: p.status === 'disponible' ? '#22543D' : '#822727' }}>
                    {p.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{p.featured ? '⭐ Sí' : 'No'}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Link href={`/admin/property/${p.id}`} style={{ color: 'var(--color-accent)', fontWeight: 500, marginRight: '1rem' }}>Editar</Link>
                  {/* Delete action ideally needs a client form, we'll keep it simple or implement inside edit page */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

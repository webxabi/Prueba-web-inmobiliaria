import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos Legales',
};

export default function TerminosLegalesPage() {
  const legalPages = [
    {
      title: 'Aviso Legal',
      href: '/aviso-legal',
      description: 'Información legal sobre el titular de la web, condiciones de uso, propiedad intelectual y limitación de responsabilidad.',
      icon: 'gavel',
    },
    {
      title: 'Política de Privacidad',
      href: '/privacidad',
      description: 'Información sobre cómo recopilamos, utilizamos y protegemos tus datos personales conforme al RGPD y la LOPDGDD.',
      icon: 'shield_person',
    },
    {
      title: 'Política de Cookies',
      href: '/cookies',
      description: 'Detalle de las cookies que utilizamos, su finalidad, duración y cómo puedes gestionarlas desde tu navegador.',
      icon: 'cookie',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - 100px)' }}>
      <style>{`
        .legal-card {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          padding: 2rem;
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-border);
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .legal-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }
      `}</style>
      <div className="container py-16" style={{ maxWidth: '800px' }}>
        <h1 className="h2 mb-4 text-center" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Términos Legales</h1>
        <p className="text-muted text-center mb-12" style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Consulta nuestras políticas legales para conocer tus derechos y las condiciones de uso de este sitio web.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {legalPages.map((page) => (
            <Link key={page.href} href={page.href} className="legal-card">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '2.5rem', color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.25rem' }}
              >
                {page.icon}
              </span>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  {page.title}
                </h2>
                <p className="text-muted" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {page.description}
                </p>
              </div>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', flexShrink: 0, marginLeft: 'auto', alignSelf: 'center' }}
              >
                arrow_forward
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

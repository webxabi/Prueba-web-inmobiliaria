import Link from 'next/link';
import db from '@/lib/db';
import PropertyCard from '@/components/PropertyCard';
import styles from './page.module.css';

async function getFeaturedProperties() {
  try {
    return db.prepare('SELECT * FROM properties WHERE featured = 1 ORDER BY created_at DESC LIMIT 5').all() as any[];
  } catch (e) {
    // In case DB isn't initialized fully or table empty
    return [];
  }
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className={styles.homeWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className="h1 animate-fade-in" style={{ color: 'white', marginBottom: '1rem' }}>
            Encuentra tu próximo hogar
          </h1>
          <p className="text-lg animate-fade-in" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', animationDelay: '0.2s', maxWidth: '600px' }}>
            Descubre una cuidada selección de pisos exclusivos. Tu tranquilidad es nuestra prioridad.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link href="/pisos" className={`btn btn-primary ${styles.heroBtn}`}>
              Ver pisos en venta
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="h2">Pisos Destacados</h2>
            <Link href="/pisos" className={styles.linkAccent}>
              Ver todos →
            </Link>
          </div>
          
          {featuredProperties.length > 0 ? (
            <div className={styles.propertiesGrid}>
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Actualmente no hay propiedades destacadas. Explora nuestro catálogo completo.</p>
              <Link href="/pisos" className="btn btn-outline mt-4">Explorar catálogo</Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <h2 className="h2 text-center mb-12">¿Por qué elegir Nova Estates?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🤝</div>
              <h3 className="h4">Asesoramiento Personalizado</h3>
              <p className="text-muted">Analizamos tus necesidades reales para ofrecerte opciones que encajen con tu estilo de vida.</p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>💎</div>
              <h3 className="h4">Selección Exclusiva</h3>
              <p className="text-muted">Filtramos y comprobamos cada inmueble para garantizar los más altos estándares de calidad.</p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🧭</div>
              <h3 className="h4">Acompañamiento Integral</h3>
              <p className="text-muted">Te guiamos en cada paso legal y financiero hasta la firma ante notario.</p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🔍</div>
              <h3 className="h4">Transparencia Total</h3>
              <p className="text-muted">Sin sorpresas ni letra pequeña. Operaciones claras desde el primer contacto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaContainer}`}>
          <h2 className="h2" style={{ color: 'white' }}>¿Listo para dar el paso?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem' }}>
            Déjanos tus datos y un asesor se pondrá en contacto contigo en menos de 24 horas.
          </p>
          <Link href="/contacto" className={styles.ctaBtn}>
            Solicitar Información
          </Link>
        </div>
      </section>
    </div>
  );
}

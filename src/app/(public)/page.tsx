import Link from 'next/link';
import db from '@/lib/db';
import styles from './page.module.css';
import PropertyCard from '@/components/PropertyCard';

async function getFeaturedProperties() {
  try {
    return db.prepare('SELECT id, name, price, location, sqft, rooms, bathrooms, main_image_url, status FROM properties WHERE featured = 1 ORDER BY created_at DESC LIMIT 6').all() as any[];
  } catch (e) {
    console.error('Error fetching featured properties', e);
    return [];
  }
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Inmobiliaria Premium</span>
          <h1 className={styles.heroTitle}>
            Encuentra tu próximo <span className={styles.textAccent}>hogar</span> de ensueño
          </h1>
          <p className={styles.heroDesc}>
            Descubre nuestra exclusiva selección de propiedades de lujo en las ubicaciones más prestigiosas del país.
          </p>
          
          <Link href="/pisos" className="btn btn-primary" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: 'var(--radius-lg)'}}>
            Ver Propiedades en Venta
          </Link>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className={styles.featuredSection}>
        <div className="container" style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>Propiedades Destacadas</h2>
              <p className={styles.sectionDesc}>Una selección curada de nuestras residencias más exclusivas y demandadas en el mercado actual.</p>
            </div>
            <Link href="/pisos" className={styles.viewAllLink}>
              Ver todo el catálogo
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className={styles.propertiesGrid}>
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
            {featuredProperties.length === 0 && (
              <p className="text-muted" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0' }}>No hay propiedades destacadas en este momento.</p>
            )}
          </div>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whySection}>
        <div className="container" style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          
          <div className={styles.whyHeader}>
            <h2 className={styles.whyTitle}>¿Por qué elegir Nova Estates?</h2>
            <div className={styles.whyLine}></div>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyItem}>
              <div className={styles.whyIconWrap}>
                <span className={`material-symbols-outlined ${styles.whyIcon}`}>support_agent</span>
              </div>
              <h4 className={styles.whyItemTitle}>Asesoramiento Personalizado</h4>
              <p className={styles.whyItemDesc}>Guía experta en cada paso del proceso, adaptada a tus necesidades específicas.</p>
            </div>

            <div className={styles.whyItem}>
              <div className={styles.whyIconWrap}>
                <span className={`material-symbols-outlined ${styles.whyIcon}`}>workspace_premium</span>
              </div>
              <h4 className={styles.whyItemTitle}>Selección Exclusiva</h4>
              <p className={styles.whyItemDesc}>Acceso a las propiedades más prestigiosas y oportunidades fuera del mercado.</p>
            </div>

            <div className={styles.whyItem}>
              <div className={styles.whyIconWrap}>
                <span className={`material-symbols-outlined ${styles.whyIcon}`}>handshake</span>
              </div>
              <h4 className={styles.whyItemTitle}>Acompañamiento Integral</h4>
              <p className={styles.whyItemDesc}>Desde la búsqueda hasta la firma final, nos encargamos de toda la gestión.</p>
            </div>

            <div className={styles.whyItem}>
              <div className={styles.whyIconWrap}>
                <span className={`material-symbols-outlined ${styles.whyIcon}`}>visibility</span>
              </div>
              <h4 className={styles.whyItemTitle}>Transparencia Total</h4>
              <p className={styles.whyItemDesc}>Información clara, honesta y sin sorpresas en todas las operaciones.</p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaPattern}></div>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>¿Listo para dar el paso hacia tu nuevo hogar?</h2>
              <p className={styles.ctaDesc}>Nuestros expertos están a tu disposición para ayudarte a encontrar la propiedad que siempre has soñado.</p>
              <Link href="/contacto" className={styles.ctaButton}>
                Solicitar Información Ahora
                <span className="material-symbols-outlined">send</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

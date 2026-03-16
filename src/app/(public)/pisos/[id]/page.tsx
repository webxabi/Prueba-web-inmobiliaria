import { notFound } from 'next/navigation';
import db from '@/lib/db';
import styles from './page.module.css';
import Link from 'next/link';

async function getProperty(id: string) {
  try {
    const numericId = Number(id);
    console.log("🚀 Buscando propiedad con ID numérico:", numericId);
    if (isNaN(numericId)) return null;

    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(numericId) as any;
    if (!property) {
      console.log("❌ Propiedad no encontrada en SQLite para ID:", numericId);
      return null;
    }
    const images = db.prepare('SELECT * FROM property_images WHERE property_id = ?').all(numericId) as any[];
    return { ...property, images };
  } catch (e) {
    console.error("💥 Error fatal leyendo DB en getProperty:", e);
    // Don't swallow the error silently if it's a real crash
    throw e;
  }
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className={`container ${styles.pageWrapper}`}>
      
      <div className={styles.breadcrumb}>
        <Link href="/">Inicio</Link> &gt; <Link href="/pisos">Pisos</Link> &gt; {property.name}
      </div>

      <div className={styles.grid}>
        
        {/* Main Info Side */}
        <div className={styles.mainSide}>
          <div className={styles.gallery}>
            <img src={property.main_image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'} alt={property.name} className={styles.mainImage} />
            {property.images && property.images.length > 0 && (
              <div className={styles.thumbnails}>
                <img src={property.main_image_url} className={`${styles.thumbnail} ${styles.thumbnailActive}`} alt="miniatura" />
                {property.images.map((img: any) => (
                  <img key={img.id} src={img.image_url} className={styles.thumbnail} alt="miniatura gallery" />
                ))}
              </div>
            )}
          </div>

          <div className={`${styles.infoSection} mt-8`}>
            <div className={styles.header}>
              <div className={styles.price}>{formattedPrice}</div>
              <h1 className={styles.title}>{property.name}</h1>
              <div className={styles.location}>📍 {property.location}</div>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                🛏️ {property.rooms} Habitaciones
              </div>
              <div className={styles.feature}>
                🛁 {property.bathrooms} Baños
              </div>
              <div className={styles.feature}>
                📏 {property.sqft} m²
              </div>
            </div>

            <h2 className={styles.descriptionTitle}>Descripción del Inmueble</h2>
            <div className={styles.description}>
              {property.description}
            </div>
          </div>
        </div>

        {/* Sidebar / Contact Form */}
        <div className={styles.contactSide}>
          <div className={styles.contactForm}>
            <div className={styles.formHeader}>
              <h3 className="h3">¿Te interesa este piso?</h3>
              <p className="text-muted text-sm mt-2">Solicita más información o una visita sin compromiso.</p>
            </div>
            
            <form action={async (formData) => {
              'use server';
              // Here we would normally plug in email sending logic like Resend or SendGrid.
              // For demonstration, we simply log or save a dummy state.
              console.log('Contacto recibido:', formData.get('name'), formData.get('email'));
            }}>
              <div className={styles.formField}>
                <label>Nombre y Apellidos</label>
                <input type="text" name="name" className={styles.formInput} required placeholder="Juan Pérez" />
              </div>
              <div className={styles.formField}>
                <label>Email</label>
                <input type="email" name="email" className={styles.formInput} required placeholder="juan@ejemplo.com" />
              </div>
              <div className={styles.formField}>
                <label>Teléfono</label>
                <input type="tel" name="phone" className={styles.formInput} placeholder="600 000 000" />
              </div>
              <div className={styles.formField}>
                <label>Mensaje</label>
                <textarea name="message" className={styles.formTextarea} required defaultValue={`Hola, me gustaría recibir más información sobre el inmueble "${property.name}" (Ref: ${property.id}).`}></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full mt-4">
                Enviar Solicitud
              </button>
            </form>

            <div className={styles.agentInfo}>
              <div className={styles.agentAvatar}>👨‍💼</div>
              <div className={styles.agentDetails}>
                <span className={styles.agentName}>Equipo Comercial</span>
                <span className={styles.agentRole}>Nova Estates</span>
              </div>
            </div>
            
            <a href={`https://wa.me/34900123456?text=Hola,%20me%20interesa%20el%20piso%20${property.id}`} target="_blank" rel="noreferrer" className="btn btn-outline w-full mt-4" style={{ borderColor: '#25D366', color: '#25D366' }}>
              Contactar por WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

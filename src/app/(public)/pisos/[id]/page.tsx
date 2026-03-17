import { notFound } from 'next/navigation';
import supabase from '@/lib/supabase';
import styles from './page.module.css';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';
import ContactForm from '@/components/ContactForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) return { title: 'Propiedad no encontrada' };

  const { data: property } = await supabase
    .from('properties')
    .select('name, description')
    .eq('id', numericId)
    .single();

  if (!property) return { title: 'Propiedad no encontrada' };

  return {
    title: `${property.name} | EVOLO REAL STATE`,
    description: property.description.substring(0, 160) + '...',
  };
}

export async function generateStaticParams() {
  return [];
}

async function getProperty(id: string) {
  try {
    const numericId = Number(id);
    if (isNaN(numericId)) return null;

    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', numericId)
      .single();

    if (error || !property) {
      console.error("❌ Propiedad no encontrada en Supabase para ID:", numericId, error);
      return null;
    }

    const { data: images } = await supabase
      .from('property_images')
      .select('*')
      .eq('property_id', numericId);

    return { ...property, images: images || [] };
  } catch (e) {
    console.error("💥 Error fatal leyendo DB en getProperty:", e);
    throw e;
  }
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return (
      <div className={`container ${styles.pageWrapper}`} style={{ textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: 'var(--color-danger)', fontSize: '2rem', marginBottom: '1rem' }}>Propiedad no encontrada</h1>
        <p className="text-muted text-lg mb-4">No se ha podido localizar en la base de datos el ID: <strong>{id}</strong>.</p>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'left', maxWidth: '600px' }}>
          <h2 className="h4 mb-2">Información Técnica (Diagnóstico):</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text-muted)' }}>
            <li>ID Original URL: <code>{JSON.stringify(id)}</code></li>
            <li>ID Parseado (Numérico): <code>{Number(id)}</code></li>
            <li>Tipo de Entorno: <code>{process.env.NODE_ENV}</code></li>
          </ul>
        </div>
        <Link href="/pisos" className="btn btn-primary mt-8">Volver al catálogo</Link>
      </div>
    );
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
          <ImageGallery 
            mainImageUrl={property.main_image_url} 
            images={property.images} 
            name={property.name} 
          />

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

            {property.youtube_url && (() => {
              // Convert YouTube URL to embeddable format
              let videoId = '';
              try {
                const url = new URL(property.youtube_url);
                if (url.hostname.includes('youtu.be')) {
                  videoId = url.pathname.slice(1);
                } else {
                  videoId = url.searchParams.get('v') || '';
                }
              } catch { /* invalid URL, skip */ }

              if (!videoId) return null;
              return (
                <div style={{ marginTop: '2rem' }}>
                  <h2 className={styles.descriptionTitle}>Vídeo del Inmueble</h2>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="Vídeo del inmueble"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Sidebar / Contact Form */}
        <div className={styles.contactSide}>
          <div className={styles.contactForm}>
            <div className={styles.formHeader}>
              <h3 className="h3">¿Te interesa este piso?</h3>
              <p className="text-muted text-sm mt-2">Solicita más información o una visita sin compromiso.</p>
            </div>
            
            <ContactForm variant="property" propertyId={property.id} propertyName={property.name} />

            <div className={styles.agentInfo}>
              <div className={styles.agentAvatar}>👨‍💼</div>
              <div className={styles.agentDetails}>
                <span className={styles.agentName}>Equipo Comercial</span>
                <span className={styles.agentRole}>EVOLO REAL STATE</span>
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

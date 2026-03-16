import Link from 'next/link';
import Image from 'next/image';
import styles from './PropertyCard.module.css';

interface PropertyProps {
  id: number;
  name: string;
  price: number;
  sqft: number;
  rooms: number;
  bathrooms: number;
  location: string;
  main_image_url: string;
  status: string;
  featured: number;
}

export default function PropertyCard({ property }: { property: PropertyProps }) {
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link href={`/pisos/${property.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <div className={styles.badges}>
          {property.status && property.status.toLowerCase() !== 'disponible' && (
            <span className={styles.badge}>{property.status}</span>
          )}
          {property.featured === 1 && (
            <span className={`${styles.badge} ${styles.badgeFeatured}`}>Destacado</span>
          )}
        </div>
        {/* Using a standard img tag here to support dynamic uploads simply in local env without next/image config headaches for remote paths. In prod, we'd configure next/image to allow the domain. */}
        <img 
          src={property.main_image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'} 
          alt={property.name} 
          className={styles.image}
          loading="lazy"
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.price}>{formattedPrice}</div>
        <h3 className={styles.title}>{property.name}</h3>
        <div className={styles.location}>
          <span>📍</span> {property.location}
        </div>
        
        <div className={styles.features}>
          <div className={styles.feature} title="Habitaciones">
            <span>🛏️</span> {property.rooms}
          </div>
          <div className={styles.feature} title="Baños">
            <span>🛁</span> {property.bathrooms}
          </div>
          <div className={styles.feature} title="Metros cuadrados">
            <span>📏</span> {property.sqft} m²
          </div>
        </div>
      </div>
    </Link>
  );
}

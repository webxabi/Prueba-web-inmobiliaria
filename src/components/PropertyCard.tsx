import Link from 'next/link';
import Image from 'next/image';
import styles from './PropertyCard.module.css';

interface PropertyProps {
  property: {
    id: number;
    name: string;
    price: number;
    location: string;
    sqft: number;
    rooms: number;
    bathrooms: number;
    main_image_url: string;
    status: string;
  };
}

export default function PropertyCard({ property }: PropertyProps) {
  // Determine badge style based on status
  let badgeLabel = '';
  let badgeStyle = {};
  
  if (property.status === 'reservado') {
    badgeLabel = 'Reservado';
    badgeStyle = { backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)' };
  } else if (property.status === 'vendido') {
    badgeLabel = 'Vendido';
    badgeStyle = { backgroundColor: 'var(--color-danger)', color: 'white' };
  } else {
    badgeLabel = 'Disponible';
  }

  return (
    <Link href={`/pisos/${property.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={property.main_image_url || '/placeholder.jpg'}
          alt={property.name}
          fill
          className={styles.image}
        />
        {property.status !== 'disponible' && (
          <div className={styles.badgeTop} style={badgeStyle}>
            {badgeLabel}
          </div>
        )}
        <div className={styles.priceBadge}>
          {new Intl.NumberFormat('es-ES').format(property.price)} €
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.location}>
          <span className={`material-symbols-outlined ${styles.locationIcon}`}>location_on</span>
          <span className={styles.locationText}>{property.location}</span>
        </div>
        
        <h3 className={styles.title}>{property.name}</h3>
        
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={`material-symbols-outlined ${styles.statIcon}`}>square_foot</span>
            <span className={styles.statText}>{property.sqft} m²</span>
          </div>
          <div className={styles.statItem}>
            <span className={`material-symbols-outlined ${styles.statIcon}`}>bed</span>
            <span className={styles.statText}>{property.rooms} Hab.</span>
          </div>
          <div className={styles.statItem}>
            <span className={`material-symbols-outlined ${styles.statIcon}`}>bathtub</span>
            <span className={styles.statText}>{property.bathrooms} Baños</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

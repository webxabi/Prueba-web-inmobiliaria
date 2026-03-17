'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/(public)/pisos/[id]/page.module.css';

interface GalleryProps {
  mainImageUrl: string;
  images: Array<{ id: number; image_url: string }>;
  name: string;
}

export default function ImageGallery({ mainImageUrl, images, name }: GalleryProps) {
  const [activeImage, setActiveImage] = useState(
    mainImageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'
  );

  return (
    <div className={styles.gallery}>
      {/* We use standard img to maintain the current CSS setup cleanly without next/image exact dimensions requirements */}
      <img src={activeImage} alt={name} className={styles.mainImage} />
      
      {images && images.length > 0 && (
        <div className={styles.thumbnails}>
          {/* Default main image as the first thumbnail */}
          <img 
            src={mainImageUrl} 
            className={`${styles.thumbnail} ${activeImage === mainImageUrl ? styles.thumbnailActive : ''}`} 
            alt={`Miniatura principal de ${name}`}
            onClick={() => setActiveImage(mainImageUrl)}
            style={{ cursor: 'pointer' }}
          />
          {/* Gallery images */}
          {images.map((img) => (
            <img 
              key={img.id} 
              src={img.image_url} 
              className={`${styles.thumbnail} ${activeImage === img.image_url ? styles.thumbnailActive : ''}`} 
              alt={`Miniatura galería de ${name}`}
              onClick={() => setActiveImage(img.image_url)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

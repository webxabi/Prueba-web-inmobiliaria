'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Nova<span>Estates</span>
        </Link>
        
        <nav className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Inicio</Link>
          <Link href="/pisos" className={styles.navLink}>Propiedades</Link>
          <Link href="/sobre-nosotros" className={styles.navLink}>Nosotros</Link>
          <Link href="/contacto" className={styles.navLink}>Contacto</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/contacto" className="btn btn-primary">
            Solicitar Información
          </Link>
        </div>

        <button className={styles.mobileToggle} aria-label="Abrir menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

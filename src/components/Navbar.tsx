import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          
          <Link href="/" className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className={styles.logoText}>Nova Estates</span>
          </Link>

          <nav className={styles.navLinks}>
            <Link href="/" className={styles.link}>Inicio</Link>
            <Link href="/pisos" className={styles.link}>Propiedades</Link>
            <Link href="/sobre-nosotros" className={styles.link}>Nosotros</Link>
            <Link href="/contacto" className={styles.link}>Contacto</Link>
          </nav>

          <div className={styles.actions}>
            <Link href="/contacto" className={styles.ctaBtn}>
              Solicitar Información
            </Link>
            <Link href="/admin" className={styles.userBtn}>
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}

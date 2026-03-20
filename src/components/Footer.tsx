import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoArea}>
              <div className={styles.logoIcon}>
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fillRule="evenodd"></path>
                </svg>
              </div>
              <span className={styles.logoText}>EVOLO REAL STATE</span>
            </Link>
            <p className={styles.brandDesc}>
              Líderes en el sector inmobiliario de lujo, transformando sueños en residencias reales con un servicio de excelencia incomparable.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialBtn}><span className={`material-symbols-outlined ${styles.socialIcon}`}>share</span></a>
              <a href="mailto:info@evolorealstate.com" className={styles.socialBtn}><span className={`material-symbols-outlined ${styles.socialIcon}`}>mail</span></a>
              <a href="tel:+34912345678" className={styles.socialBtn}><span className={`material-symbols-outlined ${styles.socialIcon}`}>call</span></a>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Enlaces Rápidos</h4>
            <ul className={styles.linkList}>
              <li><Link href="/" className={styles.link}>Inicio</Link></li>
              <li><Link href="/pisos" className={styles.link}>Propiedades</Link></li>
              <li><Link href="/sobre-nosotros" className={styles.link}>Sobre Nosotros</Link></li>
              <li><Link href="/contacto" className={styles.link}>Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Servicios</h4>
            <ul className={styles.linkList}>
              <li><Link href="/pisos" className={styles.link}>Venta de Inmuebles</Link></li>
              <li><span className={styles.link}>Alquiler de Lujo</span></li>
              <li><span className={styles.link}>Gestión Patrimonial</span></li>
              <li><span className={styles.link}>Valoración Gratuita</span></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Contacto</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={`material-symbols-outlined ${styles.contactIcon}`}>location_on</span>
                <span>Calle Serrano 45, Planta 4<br/>28001 Madrid, España</span>
              </li>
              <li className={styles.contactItem}>
                <span className={`material-symbols-outlined ${styles.contactIcon}`}>call</span>
                <span>+34 912 345 678</span>
              </li>
              <li className={styles.contactItem}>
                <span className={`material-symbols-outlined ${styles.contactIcon}`}>mail</span>
                <span>info@evolorealstate.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} EVOLO REAL STATE S.L. Todos los derechos reservados.</p>
          <div className={styles.legalLinks}>
            <Link href="/terminos-legales" className={styles.legalLink}>Términos Legales</Link>
            <Link href="/aviso-legal" className={styles.legalLink}>Aviso Legal</Link>
            <Link href="/privacidad" className={styles.legalLink}>Privacidad</Link>
            <Link href="/cookies" className={styles.legalLink}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

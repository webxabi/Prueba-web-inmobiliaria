import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>Nova<span>Estates</span></div>
          <p className={styles.description}>
            Especialistas en la venta de pisos exclusivos. Te acompañamos en todo el proceso para que encuentres tu hogar ideal con total confianza y transparencia.
          </p>
        </div>
        
        <div className={styles.links}>
          <h4>Enlaces Rápidos</h4>
          <Link href="/pisos">Ver Propiedades</Link>
          <Link href="/sobre-nosotros">Sobre Nosotros</Link>
          <Link href="/contacto">Contacto</Link>
        </div>

        <div className={styles.links}>
          <h4>Legal</h4>
          <Link href="/aviso-legal">Aviso Legal</Link>
          <Link href="/privacidad">Política de Privacidad</Link>
          <Link href="/cookies">Política de Cookies</Link>
        </div>

        <div className={styles.links}>
          <h4>Contacto</h4>
          <a href="tel:+34900123456">📞 +34 900 123 456</a>
          <a href="mailto:info@novaestates.es">✉️ info@novaestates.es</a>
          <p>📍 Av. Principal 123, Madrid</p>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <div className="container">
          &copy; {new Date().getFullYear()} Nova Estates. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

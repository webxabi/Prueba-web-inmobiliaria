import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contacta con nosotros',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - 100px)'}}>
      <div className="container py-16">
        <h1 className="h1 mb-8 text-center" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Contacta con Nosotros</h1>
        
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }}>
          
          <div>
            <h2 className="h3 mb-4" style={{ color: 'var(--color-primary)' }}>Información de Contacto</h2>
            <p className="text-muted mb-8" style={{ fontSize: '1.125rem' }}>Estamos a tu disposición para resolver cualquier duda o ayudarte en la búsqueda de tu próximo hogar.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span className="material-symbols-outlined text-accent" style={{ fontSize: '1.5rem', marginTop: '4px' }}>location_on</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px', color: 'var(--color-primary)' }}>Oficina Principal</strong>
                  <span className="text-muted">Calle Castaño 17, Urb. Entreálamos<br/>28222 Majadahonda, Madrid</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span className="material-symbols-outlined text-accent" style={{ fontSize: '1.5rem', marginTop: '4px' }}>call</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px', color: 'var(--color-primary)' }}>Teléfono</strong>
                  <a href="tel:+34696571867" className="text-muted" style={{ textDecoration: 'underline' }}>696 571 867</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span className="material-symbols-outlined text-accent" style={{ fontSize: '1.5rem', marginTop: '4px' }}>mail</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px', color: 'var(--color-primary)' }}>Correo Electrónico</strong>
                  <a href="mailto:info@evolorealstate.com" className="text-muted" style={{ textDecoration: 'underline' }}>info@evolorealstate.com</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span className="material-symbols-outlined text-accent" style={{ fontSize: '1.5rem', marginTop: '4px' }}>schedule</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px', color: 'var(--color-primary)' }}>Horario</strong>
                  <span className="text-muted">Lunes a Viernes: 09:00 - 19:00<br/>Sábados: 10:00 - 14:00</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--color-surface)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }}>
            <h2 className="h3 mb-6" style={{ color: 'var(--color-primary)' }}>Envíanos un mensaje</h2>
            <ContactForm variant="general" />
          </div>

        </div>
      </div>
    </div>
  );
}

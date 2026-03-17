import { Metadata } from 'next';
import styles from './page.module.css';

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
                  <span className="text-muted">Calle Serrano 45, Planta 4<br/>28001 Madrid, España</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span className="material-symbols-outlined text-accent" style={{ fontSize: '1.5rem', marginTop: '4px' }}>call</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px', color: 'var(--color-primary)' }}>Teléfono</strong>
                  <a href="tel:+34912345678" className="text-muted" style={{ textDecoration: 'underline' }}>+34 912 345 678</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span className="material-symbols-outlined text-accent" style={{ fontSize: '1.5rem', marginTop: '4px' }}>mail</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px', color: 'var(--color-primary)' }}>Correo Electrónico</strong>
                  <a href="mailto:info@novaestates.com" className="text-muted" style={{ textDecoration: 'underline' }}>info@novaestates.com</a>
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
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} action={async (formData) => {
              'use server';
              console.log('General contact form submitted', formData.get('name'));
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>Nombre Completo</label>
                <input type="text" name="name" required style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>Email</label>
                <input type="email" name="email" required style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>Motivo de la consulta</label>
                <select name="subject" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}>
                  <option value="comprar">Comprar una propiedad</option>
                  <option value="vender">Vender una propiedad</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>Mensaje</label>
                <textarea name="message" required style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', minHeight: '120px', resize: 'vertical', backgroundColor: 'var(--color-background)' }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem', width: '100%', backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', fontWeight: 700, border: 'none', borderRadius: 'var(--radius-md)' }}>Enviar Mensaje</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

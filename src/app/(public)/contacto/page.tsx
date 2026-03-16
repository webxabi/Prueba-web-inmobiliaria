import styles from './page.module.css';

export default function ContactPage() {
  return (
    <div className="container py-16">
      <h1 className="h1 mb-8 text-center">Contacta con Nosotros</h1>
      
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div>
          <h2 className="h3 mb-4">Información de Contacto</h2>
          <p className="text-muted mb-8">Estamos a tu disposición para resolver cualquier duda o ayudarte en la búsqueda de tu próximo hogar.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px' }}>📍 Oficina Principal</strong>
              <span className="text-muted">Av. Principal 123, 28001 Madrid, España</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px' }}>📞 Teléfono</strong>
              <a href="tel:+34900123456" className="text-muted" style={{ textDecoration: 'underline' }}>+34 900 123 456</a>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px' }}>✉️ Correo Electrónico</strong>
              <a href="mailto:info@novaestates.es" className="text-muted" style={{ textDecoration: 'underline' }}>info@novaestates.es</a>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.125rem', marginBottom: '4px' }}>🕒 Horario</strong>
              <span className="text-muted">Lunes a Viernes: 09:00 - 19:00<br/>Sábados: 10:00 - 14:00</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
          <h2 className="h3 mb-6">Envíanos un mensaje</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} action={async (formData) => {
            'use server';
            console.log('General contact form submitted', formData.get('name'));
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>Nombre Completo</label>
              <input type="text" name="name" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>Email</label>
              <input type="email" name="email" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>Motivo de la consulta</label>
              <select name="subject" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'white' }}>
                <option value="comprar">Comprar una propiedad</option>
                <option value="vender">Vender una propiedad</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>Mensaje</label>
              <textarea name="message" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', minHeight: '120px', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '1rem', marginTop: '0.5rem' }}>Enviar Mensaje</button>
          </form>
        </div>

      </div>
    </div>
  );
}

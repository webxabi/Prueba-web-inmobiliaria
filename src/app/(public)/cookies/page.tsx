import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
};

export default function CookiesPage() {
  return (
    <div className="container py-16" style={{ maxWidth: '800px' }}>
      <h1 className="h2 mb-8" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Política de Cookies</h1>
      <div className="text-muted" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8 }}>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>1. ¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario (ordenador, teléfono móvil, tablet) cuando los visita. Su función principal es reconocer al usuario cada vez que accede al sitio web y mejorar la calidad y usabilidad de la navegación.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>2. ¿Qué tipos de cookies utilizamos?</h2>
          <p>En el sitio web de EVOLO REAL STATE S.L. utilizamos los siguientes tipos de cookies:</p>
          
          <h3 style={{ fontWeight: 600, marginTop: '1rem', color: 'var(--color-text)' }}>a) Cookies técnicas (estrictamente necesarias)</h3>
          <p>Son aquellas que permiten al usuario la navegación por el sitio web y la utilización de las funciones esenciales del mismo, como el acceso al área de administración. Estas cookies no requieren consentimiento del usuario.</p>

          <h3 style={{ fontWeight: 600, marginTop: '1rem', color: 'var(--color-text)' }}>b) Cookies de terceros</h3>
          <p>En caso de que se integren vídeos de YouTube en las fichas de los inmuebles, YouTube (Google LLC) puede instalar sus propias cookies con finalidades analíticas y publicitarias. Estas cookies están sujetas a la política de privacidad de Google, que puede consultar en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>policies.google.com/privacy</a>.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>3. Detalle de las cookies utilizadas</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--color-text)' }}>Cookie</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--color-text)' }}>Tipo</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--color-text)' }}>Finalidad</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--color-text)' }}>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem' }}>session_token</td>
                  <td style={{ padding: '0.75rem' }}>Técnica</td>
                  <td style={{ padding: '0.75rem' }}>Gestión de sesión del panel de administración</td>
                  <td style={{ padding: '0.75rem' }}>Sesión</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem' }}>__next*</td>
                  <td style={{ padding: '0.75rem' }}>Técnica</td>
                  <td style={{ padding: '0.75rem' }}>Funcionamiento del framework Next.js</td>
                  <td style={{ padding: '0.75rem' }}>Sesión</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem' }}>YT / VISITOR_INFO*</td>
                  <td style={{ padding: '0.75rem' }}>Terceros (YouTube)</td>
                  <td style={{ padding: '0.75rem' }}>Reproducción de vídeos incrustados y analíticas de YouTube</td>
                  <td style={{ padding: '0.75rem' }}>Variable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>4. ¿Cómo gestionar o desactivar las cookies?</h2>
          <p>El usuario puede configurar su navegador para aceptar, rechazar o eliminar las cookies. A continuación, se facilitan instrucciones para los navegadores más comunes:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Microsoft Edge</a></li>
          </ul>
          <p>Tenga en cuenta que la desactivación de las cookies técnicas puede afectar al correcto funcionamiento del sitio web.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>5. Actualización de la Política de Cookies</h2>
          <p>EVOLO REAL STATE S.L. se reserva el derecho de modificar esta Política de Cookies en cualquier momento para adaptarla a novedades legislativas, criterios jurisprudenciales o cambios en la configuración del sitio web. En caso de realizar cambios significativos, se informará al usuario mediante un aviso en el sitio web.</p>
          <p><strong>Última actualización:</strong> Marzo 2026</p>
        </section>
      </div>
    </div>
  );
}

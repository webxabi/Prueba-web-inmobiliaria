import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal',
};

export default function AvisoLegalPage() {
  return (
    <div className="container py-16" style={{ maxWidth: '800px' }}>
      <h1 className="h2 mb-8" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Aviso Legal</h1>
      <div className="text-muted" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8 }}>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>1. Datos Identificativos</h2>
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSICE), se ponen a disposición de los usuarios los siguientes datos identificativos del titular de este sitio web:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li><strong>Denominación social:</strong> EVOLO REAL STATE S.L.</li>
            <li><strong>Domicilio social:</strong> Calle Castaño 17, Urb. Entreálamos, 28222 Majadahonda, Madrid, España</li>
            <li><strong>C.I.F.:</strong> B-XXXXXXXX</li>
            <li><strong>Correo electrónico:</strong> info@evolorealstate.com</li>
            <li><strong>Teléfono:</strong> +34 912 345 678</li>
          </ul>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>2. Objeto</h2>
          <p>El presente Aviso Legal regula el uso y acceso al sitio web de EVOLO REAL STATE S.L. (en adelante, "el sitio web"). La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>3. Propiedad Intelectual e Industrial</h2>
          <p>Todos los contenidos del sitio web, incluyendo de forma enunciativa pero no limitativa: textos, fotografías, gráficos, imágenes, iconos, tecnología, software, diseños, así como la selección y disposición de los mismos, están protegidos como propiedad intelectual de EVOLO REAL STATE S.L. o de terceros cuyos derechos ha obtenido legítimamente, quedando protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.</p>
          <p>Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de la totalidad o parte de los contenidos de este sitio web sin la autorización expresa y por escrito de EVOLO REAL STATE S.L.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>4. Condiciones de Uso</h2>
          <p>El usuario se compromete a utilizar el sitio web de conformidad con la ley, el presente Aviso Legal, las buenas costumbres y el orden público. El usuario se obliga a no utilizar el sitio web con fines ilícitos o que puedan resultar lesivos para los derechos e intereses de terceros, o que puedan dañar, inutilizar, sobrecargar o deteriorar el sitio web.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>5. Exclusión de Responsabilidad</h2>
          <p>EVOLO REAL STATE S.L. no se hace responsable de los daños o perjuicios de cualquier tipo que puedan deberse a la falta de disponibilidad o continuidad del funcionamiento del sitio web, ni de los errores en los contenidos, ni de la presencia de virus u otros elementos dañinos.</p>
          <p>La información que se ofrece sobre los inmuebles listados en este sitio web tiene carácter meramente orientativo y no vinculante, pudiendo estar sujeta a modificaciones sin previo aviso.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>6. Enlaces a Terceros</h2>
          <p>En caso de que en el sitio web se incluyesen enlaces o hipervínculos hacia otros sitios de Internet, EVOLO REAL STATE S.L. no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>7. Legislación Aplicable y Jurisdicción</h2>
          <p>Las relaciones establecidas entre EVOLO REAL STATE S.L. y el usuario se regirán por la normativa española vigente, y cualquier controversia será sometida a los Juzgados y Tribunales de la ciudad de Madrid.</p>
        </section>
      </div>
    </div>
  );
}

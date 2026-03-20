import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
};

export default function PrivacidadPage() {
  return (
    <div className="container py-16" style={{ maxWidth: '800px' }}>
      <h1 className="h2 mb-8" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Política de Privacidad</h1>
      <div className="text-muted" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8 }}>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>1. Responsable del Tratamiento</h2>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li><strong>Responsable:</strong> EVOLO REAL STATE S.L.</li>
            <li><strong>Domicilio:</strong> Calle Castaño 17, Urb. Entreálamos, 28222 Majadahonda, Madrid, España</li>
            <li><strong>C.I.F.:</strong> B-XXXXXXXX</li>
            <li><strong>Correo electrónico:</strong> info@evolorealstate.com</li>
          </ul>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>2. Finalidad del Tratamiento</h2>
          <p>En EVOLO REAL STATE S.L. tratamos la información que nos facilitan las personas interesadas con las siguientes finalidades:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Gestionar las solicitudes de información sobre inmuebles y servicios inmobiliarios realizadas a través de los formularios de contacto del sitio web.</li>
            <li>Mantener la relación comercial con los clientes para la prestación de servicios de intermediación inmobiliaria.</li>
            <li>Enviar comunicaciones comerciales sobre inmuebles y servicios de EVOLO REAL STATE S.L., siempre que el usuario haya dado su consentimiento previo.</li>
          </ul>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>3. Legitimación del Tratamiento</h2>
          <p>La base legal para el tratamiento de sus datos personales es:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li><strong>Consentimiento del interesado:</strong> al completar y enviar los formularios de contacto, el usuario consiente el tratamiento de sus datos para las finalidades indicadas.</li>
            <li><strong>Ejecución de un contrato:</strong> cuando los datos son necesarios para la prestación de servicios solicitados.</li>
            <li><strong>Interés legítimo:</strong> para el mantenimiento de la relación comercial y la mejora de nuestros servicios.</li>
          </ul>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>4. Datos Recopilados</h2>
          <p>Los datos personales que podemos recopilar a través de los formularios del sitio web incluyen:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Mensaje o consulta</li>
          </ul>
          <p>Todos los campos marcados como obligatorios en los formularios deben ser cumplimentados para que podamos gestionar correctamente su solicitud.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>5. Conservación de los Datos</h2>
          <p>Los datos personales proporcionados se conservarán durante el tiempo estrictamente necesario para atender su solicitud y, en su caso, durante los plazos legalmente establecidos. Una vez finalizada la relación, los datos se bloquearán y se conservarán únicamente a efectos de cumplimiento de obligaciones legales.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>6. Destinatarios de los Datos</h2>
          <p>Sus datos personales no serán cedidos a terceros, salvo obligación legal. No se realizan transferencias internacionales de datos. Los datos podrán ser tratados por encargados del tratamiento que prestan servicios a EVOLO REAL STATE S.L. (como el proveedor de hosting o la plataforma de gestión de bases de datos), siempre bajo las garantías de seguridad adecuadas.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>7. Derechos del Usuario</h2>
          <p>En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), el usuario tiene derecho a:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li><strong>Acceso:</strong> solicitar información sobre los datos personales que tratamos.</li>
            <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
            <li><strong>Limitación:</strong> solicitar la restricción del tratamiento en determinadas circunstancias.</li>
            <li><strong>Portabilidad:</strong> recibir sus datos en un formato estructurado y de uso común.</li>
            <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos en determinados supuestos.</li>
          </ul>
          <p>Para ejercer cualquiera de estos derechos, puede dirigirse a <strong>info@evolorealstate.com</strong> indicando en el asunto "Ejercicio de derechos RGPD" y adjuntando copia de su documento de identidad.</p>
          <p>Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>www.aepd.es</a>.</p>
        </section>

        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>8. Seguridad</h2>
          <p>EVOLO REAL STATE S.L. ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, conforme al estado de la tecnología, la naturaleza de los datos y los riesgos a los que están expuestos.</p>
        </section>
      </div>
    </div>
  );
}

export default function LegalPage() {
  return (
    <div className="container py-16" style={{ maxWidth: '800px' }}>
      <h1 className="h2 mb-8">Aviso Legal, Privacidad y Cookies</h1>
      <div className="text-muted" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8 }}>
        <p>
          Este sitio web es una demostración técnica de una inmobiliaria. Los datos aquí mostrados no corresponden a entidades o inmuebles reales. (A efectos del aviso legal genérico):
        </p>
        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>1. Datos Identificativos</h2>
          <p>La empresa titular de dominio web es Nova Estates S.L. con domicilio a estos efectos en Av. Principal 123, Madrid, número de C.I.F.: B-12345678.</p>
        </section>
        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>2. Política de Privacidad</h2>
          <p>En cumplimiento de lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, le informamos que los datos personales que nos facilite a través de los formularios serán tratados con estricta confidencialidad bajo la responsabilidad de Nova Estates S.L. con la única finalidad de gestionar sus solicitudes de información inmobiliaria.</p>
        </section>
        <section>
          <h2 className="h4 mb-2" style={{ color: 'var(--color-text)' }}>3. Política de Cookies</h2>
          <p>Este sitio web utiliza cookies técnicas necesarias para el correcto funcionamiento de las sesiones transaccionales (como el acceso al área de administración). No utilizamos cookies analíticas de terceros sin su consentimiento expreso.</p>
        </section>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - 100px)'}}>
      <div className="container py-16" style={{ maxWidth: '800px' }}>
        <div style={{ background: 'var(--color-surface)', padding: '4rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}>
          <h1 className="h1 mb-8 text-center" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Sobre Nosotros</h1>
          <div className="text-lg text-muted" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8 }}>
            <p>
              En <strong>Nova Estates</strong>, entendemos que comprar o vender una propiedad es una de las decisiones financieras y emocionales más importantes de la vida. Por eso, hemos creado un modelo de inmobiliaria basado en la exclusividad, la confianza y el servicio integral.
            </p>
            <p>
              Con más de 10 años de experiencia en el sector inmobiliario premium, nuestro equipo de expertos está dedicado a ofrecer un asesoramiento personalizado, analizando cada detalle para asegurar que encuentres no solo una casa, sino tu verdadero hogar.
            </p>
            <p>
              Nos enorgullecemos de nuestro catálogo cuidadosamente seleccionado, que incluye desde modernos apartamentos en el centro de la ciudad hasta exclusivas villas en las afueras. Cada propiedad listada con nosotros cumple rigurosos estándares de calidad.
            </p>
            <p>
              Tu tranquilidad es nuestra prioridad. Te acompañamos desde la primera visita hasta la firma final en notaría, gestionando todos los trámites legales y financieros con total transparencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

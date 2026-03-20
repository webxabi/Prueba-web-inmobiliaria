'use client';

import { useState } from 'react';

// ⬇️ CAMBIA ESTE ID POR EL TUYO DE FORMSPREE ⬇️
// Obtén tu ID en https://formspree.io → Crear formulario → Copiar el endpoint ID
const FORMSPREE_FORM_ID = 'xaqpkejo';

interface ContactFormProps {
  propertyId?: number;
  propertyName?: string;
  variant?: 'general' | 'property';
}

export default function ContactForm({ propertyId, propertyName, variant = 'general' }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await res.json();
        setError(data?.errors?.[0]?.message || 'Error al enviar el formulario');
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1.5rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#22c55e', display: 'block', marginBottom: '1rem' }}>check_circle</span>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>¡Mensaje enviado!</h3>
        <p className="text-muted">Hemos recibido tu solicitud. Te contactaremos lo antes posible.</p>
        <button 
          onClick={() => setSuccess(false)} 
          style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-accent)', color: 'var(--color-primary)', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  // ---- PROPERTY SIDEBAR VARIANT ----
  if (variant === 'property') {
    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && <div style={{ color: 'white', backgroundColor: 'var(--color-danger)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 600 }}>{error}</div>}
        {/* Hidden field so you know which property the lead is about */}
        <input type="hidden" name="_subject" value={`Consulta sobre: ${propertyName} (Ref: ${propertyId})`} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Nombre y Apellidos</label>
          <input type="text" name="name" required placeholder="Juan Pérez" style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-background)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Email</label>
          <input type="email" name="email" required placeholder="juan@ejemplo.com" style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-background)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Teléfono</label>
          <input type="tel" name="phone" placeholder="600 000 000" style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-background)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Mensaje</label>
          <textarea name="message" required defaultValue={`Hola, me gustaría recibir más información sobre el inmueble "${propertyName}" (Ref: ${propertyId}).`} style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-background)', minHeight: '100px', resize: 'vertical' }}></textarea>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.875rem', width: '100%', marginTop: '0.5rem', backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', fontWeight: 700, border: 'none', borderRadius: 'var(--radius-md)' }}>
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>
    );
  }

  // ---- GENERAL CONTACT PAGE VARIANT ----
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {error && <div style={{ color: 'white', backgroundColor: 'var(--color-danger)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 600 }}>{error}</div>}
      <input type="hidden" name="_subject" value="Nueva consulta desde la web" />
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>Nombre Completo</label>
        <input type="text" name="name" required style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>Email</label>
        <input type="email" name="email" required style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>Teléfono</label>
        <input type="tel" name="phone" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} />
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
      <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem', width: '100%', backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', fontWeight: 700, border: 'none', borderRadius: 'var(--radius-md)' }}>
        {loading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}

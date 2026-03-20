'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: 'var(--color-primary)',
      color: 'white',
      padding: '1.25rem 1.5rem',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        <p style={{ margin: 0, fontSize: '0.9375rem', lineHeight: 1.5, flex: 1, minWidth: '280px' }}>
          Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación. 
          Puedes consultar nuestra{' '}
          <Link href="/cookies" style={{ color: 'var(--color-accent)', textDecoration: 'underline', fontWeight: 600 }}>
            Política de Cookies
          </Link>{' '}
          para más información.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
          <button
            onClick={handleReject}
            style={{
              padding: '0.625rem 1.25rem',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 'var(--radius-md)',
              background: 'transparent',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '0.625rem 1.25rem',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-accent)',
              color: 'var(--color-primary)',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Aceptar Cookies
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        // Redirect directly using browser logic to force reload if needed or just replace
        window.location.href = '/admin';
      } else {
        const data = await res.json();
        setError(data.error || 'Login fallido');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <form onSubmit={handleLogin} style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>Acceso Administrador</h1>
        
        {error && <div style={{ color: 'white', backgroundColor: 'var(--color-danger)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>{error}</div>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="username" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Usuario</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Contraseña</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          {loading ? 'Iniciando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

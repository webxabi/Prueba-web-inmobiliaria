'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-background)' }}>
      <header style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold' }}>Panel de Administración - EVOLO REAL STATE</div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/" target="_blank" style={{ fontSize: '0.875rem', opacity: 0.8 }}>Ver Web Pública</Link>
          <button onClick={handleLogout} style={{ fontSize: '0.875rem', color: 'var(--color-danger)' }}>Cerrar Sesión</button>
        </div>
      </header>
      <main style={{ flexGrow: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}

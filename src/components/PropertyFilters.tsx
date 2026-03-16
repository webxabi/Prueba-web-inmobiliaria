'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent } from 'react';
import styles from './PropertyFilters.module.css';

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get('q') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [rooms, setRooms] = useState(searchParams.get('rooms') || '');
  const [bathrooms, setBathrooms] = useState(searchParams.get('bathrooms') || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (rooms) params.set('rooms', rooms);
    if (bathrooms) params.set('bathrooms', bathrooms);
    
    router.push(`/pisos?${params.toString()}`);
  };

  const handleReset = () => {
    setQ('');
    setMinPrice('');
    setMaxPrice('');
    setRooms('');
    setBathrooms('');
    router.push('/pisos');
  };

  return (
    <form className={styles.filtersForm} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="q">Búsqueda rápida</label>
          <input 
            type="text" 
            id="q" 
            className={styles.input} 
            placeholder="Piso en centro..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Rango de Precio (€)</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" placeholder="Mín" className={styles.input} value={minPrice} onChange={e => setMinPrice(e.target.value)} />
            <input type="number" placeholder="Máx" className={styles.input} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="rooms">Habitaciones (mín)</label>
          <select id="rooms" className={styles.select} value={rooms} onChange={e => setRooms(e.target.value)}>
            <option value="">Todas</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="bathrooms">Baños (mín)</label>
          <select id="bathrooms" className={styles.select} value={bathrooms} onChange={e => setBathrooms(e.target.value)}>
            <option value="">Todos</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={handleReset} className={styles.btnReset}>Limpiar</button>
        <button type="submit" className="btn btn-primary">Buscar</button>
      </div>
    </form>
  );
}

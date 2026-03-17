'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function PropertyFormPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sqft: '',
    rooms: '',
    bathrooms: '',
    location: '',
    status: 'disponible',
    featured: false,
    main_image_url: '',
  });
  
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [existingImages, setExistingImages] = useState<Array<{ id: number, image_url: string }>>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load existing data if edit mode
  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      fetch(`/api/properties/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) setError(data.error);
          else {
            setFormData({
              name: data.name,
              description: data.description,
              price: data.price.toString(),
              sqft: data.sqft.toString(),
              rooms: data.rooms.toString(),
              bathrooms: data.bathrooms.toString(),
              location: data.location,
              status: data.status,
              featured: data.featured === 1 || data.featured === true,
              main_image_url: data.main_image_url || '',
            });
            if (data.images) {
              setExistingImages(data.images);
            }
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id, isNew]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMainImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: any) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('¿Seguro que deseas eliminar esta imagen de la galería?')) return;
    try {
      const res = await fetch(`/api/images/${imageId}`, { method: 'DELETE' });
      if (res.ok) {
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
      } else {
        alert('Error al eliminar la imagen');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let res;
      // Convert to FormData to support file uploads in both create and edit modes
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => fd.append(key, val.toString()));
      if (mainImage) fd.append('main_image', mainImage);
      else if (isNew) {
        throw new Error('La imagen principal es obligatoria');
      }
      images.forEach(img => fd.append('images', img));

      if (isNew) {
        res = await fetch('/api/properties', {
          method: 'POST',
          body: fd,
        });

      } else {
        res = await fetch(`/api/properties/${id}`, {
          method: 'PUT',
          body: fd,
        });
      }

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Error al guardar');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Seguro que deseas eliminar este inmueble?')) return;
    setLoading(true);
    const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Error al eliminar');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-surface)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 className="h3" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>{isNew ? 'Nuevo Inmueble' : `Editar Inmueble #${id}`}</h1>
        <Link href="/admin" className="text-muted" style={{ fontWeight: 600 }}>Volver</Link>
      </div>

      {error && <div style={{ color: 'white', backgroundColor: 'var(--color-danger)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600 }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Nombre del Piso</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Ubicación</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Precio (€)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Metros cuadrados (m²)</label>
            <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} required style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Habitaciones</label>
            <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} required style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Baños</label>
            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Descripción Completa</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required style={{ padding: '0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', minHeight: '150px', backgroundColor: 'var(--color-background)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'var(--color-background)', padding: '1rem', borderRadius: '4px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Estado</label>
            <select name="status" value={formData.status} onChange={handleChange} style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
              <option value="disponible">Disponible</option>
              <option value="reservado">Reservado</option>
              <option value="vendido">Vendido</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
            <label htmlFor="featured" style={{ fontWeight: 500, cursor: 'pointer' }}>Marcar como Destacado (Aparecerá en la Home)</label>
          </div>
        </div>

        <div style={{ border: '1px solid var(--color-border)', padding: '1.5rem', borderRadius: '4px', marginTop: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Imágenes {isNew ? '(Obligatoria)' : '(Sube para cambiar principal o añadir a galería)'}</h3>
          
          {!isNew && existingImages.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem' }}>Galería Actual (Haz clic en la X para borrar)</label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {existingImages.map((img) => (
                  <div key={img.id} style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                    <img src={img.image_url} alt="miniatura" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      type="button" 
                      onClick={() => handleDeleteImage(img.id)}
                      style={{ position: 'absolute', top: '4px', right: '4px', background: 'var(--color-danger)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px' }}
                      title="Eliminar imagen"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>Imagen Principal {isNew ? '*' : ''}</label>
              {formData.main_image_url && !isNew && (
                <div style={{ marginBottom: '0.5rem' }}>
                   <img src={formData.main_image_url} alt="Imagen principal" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleMainImageChange} required={isNew} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>Añadir Imágenes a la Galería (Opcional)</label>
              <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flexGrow: 1, padding: '1rem', backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 700 }}>
            {loading ? 'Guardando...' : 'Guardar Inmueble'}
          </button>
          
          {!isNew && (
            <button type="button" onClick={handleDelete} disabled={loading} className="btn btn-outline" style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}>
              Eliminar Inmueble
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

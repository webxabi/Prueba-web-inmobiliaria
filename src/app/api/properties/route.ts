import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const filterFeatured = url.searchParams.get('featured') === 'true';

    let properties = [];
    if (filterFeatured) {
      properties = db.prepare('SELECT * FROM properties WHERE featured = 1 ORDER BY created_at DESC LIMIT 5').all();
    } else {
      properties = db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all();
    }
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    const sqft = parseInt(formData.get('sqft') as string);
    const rooms = parseInt(formData.get('rooms') as string);
    const bathrooms = parseInt(formData.get('bathrooms') as string);
    const location = formData.get('location') as string;
    const status = formData.get('status') as string || 'disponible';
    const featured = formData.get('featured') === 'true' ? 1 : 0;
    
    // Main image
    let main_image_url = '';
    const file = formData.get('main_image') as File;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = Date.now() + '-' + file.name.replace(/\s+/g, '-');
      // For Next.js in production (especially Hostinger/cPanel), the public folder
      // is usually at the root of the project where the server runs.
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      main_image_url = '/uploads/' + fileName;
    } else {
      return NextResponse.json({ error: 'Main image is required' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO properties (name, description, price, sqft, rooms, bathrooms, location, status, featured, main_image_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(name, description, price, sqft, rooms, bathrooms, location, status, featured, main_image_url);

    // Multiple images (Optional)
    const images = formData.getAll('images') as File[];
    const imgStmt = db.prepare('INSERT INTO property_images (property_id, image_url) VALUES (?, ?)');
    
    for (const img of images) {
      if (img && img.size > 0) {
        const bytes = await img.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = Date.now() + '-gal-' + img.name.replace(/\s+/g, '-');
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        imgStmt.run(info.lastInsertRowid, '/uploads/' + fileName);
      }
    }

    return NextResponse.json({ success: true, id: info.lastInsertRowid });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}

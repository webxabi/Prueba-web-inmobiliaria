import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(id);
    
    if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const images = db.prepare('SELECT * FROM property_images WHERE property_id = ?').all(id);
    
    return NextResponse.json({ ...property, images });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    // We might want to delete the actual files from the disk, but for simplicity here we just delete DB rows
    db.prepare('DELETE FROM properties WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await req.json(); // For edit, to be simple we might just update text fields inside admin, sending JSON instead of multipart.
    
    const stmt = db.prepare(`
      UPDATE properties SET 
        name = ?, description = ?, price = ?, sqft = ?, rooms = ?, bathrooms = ?, location = ?, status = ?, featured = ?
      WHERE id = ?
    `);
    
    stmt.run(
      body.name, body.description, body.price, body.sqft, body.rooms, body.bathrooms, body.location, body.status, body.featured ? 1 : 0, id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

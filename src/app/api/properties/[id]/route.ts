import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !property) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const { data: images } = await supabase
      .from('property_images')
      .select('*')
      .eq('property_id', id);
    
    return NextResponse.json({ ...property, images: images || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    // With Supabase, cascading deletes on foreign keys will automatically delete rows in property_images.
    // However, deleting the storage bucket files should ideally be handled via an RPC or trigger, or manually.
    // We will keep it simple here and just delete the DB record.
    const { error } = await supabase.from('properties').delete().eq('id', id);
    
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await req.json();
    
    const { error } = await supabase
      .from('properties')
      .update({
        name: body.name,
        description: body.description,
        price: body.price,
        sqft: body.sqft,
        rooms: body.rooms,
        bathrooms: body.bathrooms,
        location: body.location,
        status: body.status,
        featured: body.featured ? true : false
      })
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

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
    const formData = await req.formData();
    
    const updatePayload: any = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseInt(formData.get('price') as string),
      sqft: parseInt(formData.get('sqft') as string),
      rooms: parseInt(formData.get('rooms') as string),
      bathrooms: parseInt(formData.get('bathrooms') as string),
      location: formData.get('location') as string,
      status: formData.get('status') as string,
      featured: formData.get('featured') === 'true'
    };

    const mainImageFile = formData.get('main_image') as File | null;
    if (mainImageFile && mainImageFile.size > 0) {
      const fileName = Date.now() + '-' + mainImageFile.name.replace(/\s+/g, '-');
      const { error: uploadError } = await supabase.storage
        .from('property-uploads')
        .upload(`main/${fileName}`, mainImageFile, { cacheControl: '3600', upsert: false });
        
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('property-uploads')
          .getPublicUrl(`main/${fileName}`);
        updatePayload.main_image_url = publicUrlData.publicUrl;
      }
    }

    const { error: updateError } = await supabase
      .from('properties')
      .update(updatePayload)
      .eq('id', id);

    if (updateError) throw updateError;

    // Multiple images (Optional)
    const images = formData.getAll('images') as File[];
    for (const img of images) {
      if (img && img.size > 0) {
        const fileName = Date.now() + '-gal-' + img.name.replace(/\s+/g, '-');
        const { error: uploadError } = await supabase.storage
          .from('property-uploads')
          .upload(`gallery/${id}/${fileName}`, img, { cacheControl: '3600', upsert: false });
          
        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('property-uploads')
             .getPublicUrl(`gallery/${id}/${fileName}`);
             
          await supabase.from('property_images').insert([
            { property_id: id, image_url: publicUrlData.publicUrl }
          ]);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating property', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

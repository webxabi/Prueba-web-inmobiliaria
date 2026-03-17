import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    
    // 1. Get the image record to find the URL
    const { data: image, error: fetchError } = await supabase
      .from('property_images')
      .select('*')
      .eq('id', id)
      .single();
      
    if (fetchError || !image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // 2. Delete the record from database
    const { error: deleteError } = await supabase
      .from('property_images')
      .delete()
      .eq('id', id);
      
    if (deleteError) throw deleteError;

    // 3. Optional: Delete from Supabase Storage
    // The URL format is: https://[project].supabase.co/storage/v1/object/public/property-uploads/gallery/[propertyId]/[fileName]
    try {
      const urlParts = image.image_url.split('/property-uploads/');
      if (urlParts.length === 2) {
        const filePath = urlParts[1];
        await supabase.storage.from('property-uploads').remove([filePath]);
      }
    } catch (e) {
      console.error('Failed to delete file from storage bucket, ignoring...', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}

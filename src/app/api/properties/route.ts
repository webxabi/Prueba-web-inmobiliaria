import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const filterFeatured = url.searchParams.get('featured') === 'true';

    let query = supabase.from('properties').select('*').order('created_at', { ascending: false });
    
    if (filterFeatured) {
      query = query.eq('featured', true).limit(5);
    }
    
    const { data: properties, error } = await query;
    if (error) throw error;
    
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties from Supabase:', error);
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
    const featured = formData.get('featured') === 'true';
    
    // Main image
    let main_image_url = '';
    const file = formData.get('main_image') as File;
    if (file && file.size > 0) {
      const fileName = Date.now() + '-' + file.name.replace(/\s+/g, '-');
      const { data, error } = await supabase.storage
        .from('property-uploads')
        .upload(`main/${fileName}`, file, { cacheControl: '3600', upsert: false });
        
      if (error) throw error;
      
      const { data: publicUrlData } = supabase.storage
        .from('property-uploads')
        .getPublicUrl(`main/${fileName}`);
        
      main_image_url = publicUrlData.publicUrl;
    } else {
      return NextResponse.json({ error: 'Main image is required' }, { status: 400 });
    }

    const { data: insertedProperty, error: insertError } = await supabase
      .from('properties')
      .insert([
        { name, description, price, sqft, rooms, bathrooms, location, status, featured, main_image_url }
      ])
      .select('id')
      .single();

    if (insertError) throw insertError;
    const propertyId = insertedProperty.id;

    // Multiple images (Optional)
    const images = formData.getAll('images') as File[];
    
    for (const img of images) {
      if (img && img.size > 0) {
        const fileName = Date.now() + '-gal-' + img.name.replace(/\s+/g, '-');
        const { error: uploadError } = await supabase.storage
          .from('property-uploads')
          .upload(`gallery/${propertyId}/${fileName}`, img, { cacheControl: '3600', upsert: false });
          
        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('property-uploads')
             .getPublicUrl(`gallery/${propertyId}/${fileName}`);
             
          await supabase.from('property_images').insert([
            { property_id: propertyId, image_url: publicUrlData.publicUrl }
          ]);
        }
      }
    }

    return NextResponse.json({ success: true, id: propertyId });
  } catch (error) {
    console.error('Error creating property in Supabase:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}

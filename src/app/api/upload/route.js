import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No files received.' }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET;

    // If Cloudinary is configured (e.g., on Vercel), upload there
    if (cloudName && uploadPreset) {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', file);
      cloudinaryFormData.append('upload_preset', uploadPreset);

      const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: cloudinaryFormData,
      });

      const cloudinaryData = await cloudinaryResponse.json();

      if (!cloudinaryResponse.ok) {
        console.error('Cloudinary upload error:', cloudinaryData);
        return NextResponse.json({ error: 'Cloudinary upload failed', details: cloudinaryData }, { status: cloudinaryResponse.status });
      }

      return NextResponse.json({
        success: true,
        url: cloudinaryData.secure_url,
      });
    }

    // Fallback for Vercel / Production: Convert to Base64 String
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64String = buffer.toString('base64');
    const mimeType = file.type || 'application/pdf';
    
    // Construct the data URI
    const dataUri = `data:${mimeType};base64,${base64String}`;

    return NextResponse.json({
      success: true,
      url: dataUri,
    });
  } catch (error) {
    console.error('Error occurred while uploading file:', error);
    return NextResponse.json({ error: 'Failed to process file upload.', details: error.message }, { status: 500 });
  }
}

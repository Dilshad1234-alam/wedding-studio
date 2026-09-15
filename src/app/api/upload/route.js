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

    // Fallback for localhost / VPS using local fs
    const { writeFile } = require('fs/promises');
    const fs = require('fs');
    const path = require('path');

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + '_' + file.name.replace(/\s+/g, '_');
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    
    try {
      await writeFile(filepath, buffer);
    } catch (writeError) {
      console.error('File write error:', writeError);
      return NextResponse.json({ error: 'Failed to write file to disk.', details: writeError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error('Error occurred while uploading file:', error);
    return NextResponse.json({ error: 'Failed to process file upload.', details: error.message }, { status: 500 });
  }
}

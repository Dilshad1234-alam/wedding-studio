import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No files received.' }, { status: 400 });
    }

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

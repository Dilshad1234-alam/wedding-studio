import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'blogs.json');

function readBlogs() {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  } catch (err) {
    console.error('Error reading blogs.json:', err);
    return [];
  }
}

function writeBlogs(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing blogs.json:', err);
    return false;
  }
}

export async function GET() {
  const blogs = readBlogs();
  return NextResponse.json(blogs, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const blogs = readBlogs();
    const newBlog = { 
      id: Date.now(), 
      title: body.title || "New Blog", 
      readTime: body.readTime || "5 min read", 
      date: body.date || "Now",
      img: body.img || ""
    };
    blogs.unshift(newBlog);
    writeBlogs(blogs);
    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    let blogs = readBlogs();
    blogs = blogs.map(b => b.id === body.id ? { ...b, ...body } : b);
    writeBlogs(blogs);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'), 10);
    let blogs = readBlogs();
    blogs = blogs.filter(b => b.id !== id);
    writeBlogs(blogs);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

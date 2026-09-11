import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    const formatted = blogs.map(b => {
      const obj = b.toObject();
      obj.id = obj._id.toString();
      return obj;
    });
    return NextResponse.json(formatted, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newBlog = await Blog.create(body);
    const result = newBlog.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, blog: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const id = body.id || body._id;
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedBlog) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const result = updatedBlog.toObject();
    result.id = result._id.toString();
    return NextResponse.json({ success: true, blog: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

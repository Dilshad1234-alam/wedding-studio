import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Package from '@/models/Package';

// GET: Fetch all packages
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const pkg = await Package.findById(id);
      if (!pkg) return NextResponse.json({ error: "Package not found" }, { status: 404 });
      return NextResponse.json(pkg);
    }

    const packages = await Package.find({}).lean();
    
    // Sort packages by price (ascending: Standard -> Silver -> Gold -> Luxury)
    packages.sort((a, b) => {
      const priceA = parseInt((a.offerPrice || '').replace(/[^0-9]/g, ''), 10) || 0;
      const priceB = parseInt((b.offerPrice || '').replace(/[^0-9]/g, ''), 10) || 0;
      return priceA - priceB;
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error("GET Packages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Add a new package
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const newPackage = await Package.create(body);
    return NextResponse.json({ message: "Package added successfully", package: newPackage }, { status: 201 });
  } catch (error) {
    console.error("POST Package error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update an existing package
export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, _id, ...updateData } = body;
    const targetId = id || _id;

    if (!targetId) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    const updatedPackage = await Package.findByIdAndUpdate(targetId, updateData, { new: true });
    
    if (!updatedPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Package updated successfully", package: updatedPackage });
  } catch (error) {
    console.error("PUT Package error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a package
export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    await Package.findByIdAndDelete(id);
    return NextResponse.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("DELETE Package error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

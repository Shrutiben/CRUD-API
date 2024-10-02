import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/lib/mongodb';

// Update a product by ID
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("productdb");
    const collection = db.collection("product");

    // Extracting id and the fields to update from request body
    const { id, name, description, price, quantity, category, brand } = await req.json();

    // Validate if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const updatedProduct = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(quantity && { quantity }),
      ...(category && { category }),
      ...(brand && { brand })
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // Filter by product ID
      { $set: updatedProduct }    // Set the updated fields
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

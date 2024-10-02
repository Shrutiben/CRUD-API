import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function POST(req: Request) {
  try {
    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db("productdb");  // Specify your database name
    const collection = db.collection("product");  // Specify your collection name

    // Parse the request body (destructuring the product fields from the body)
    const { name, description, price, quantity, category, brand } = await req.json();
    if (!name || !description || !price || !quantity || !category || !brand) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
      }
    // Construct the product object
    const product = {
      name,
      description,
      price,
      quantity,
      category,
      brand
    };

    // Insert the product into the MongoDB collection
    const result = await collection.insertOne(product);

    // Return a response with the inserted product's ID
    return NextResponse.json({ success: true, productId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);

    // Return an error response
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

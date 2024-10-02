import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

// Fetch all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("productdb");
    const collection = db.collection("product");

    const products = await collection.find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}



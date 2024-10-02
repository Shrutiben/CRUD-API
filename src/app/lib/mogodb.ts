import { MongoClient } from "mongodb";

// Extend the global object with the MongoDB client promise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// MongoDB URI from the environment variable
const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add your MongoDB URI to the .env.local file");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, use globalThis to store the MongoClient across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new MongoClient for every connection
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

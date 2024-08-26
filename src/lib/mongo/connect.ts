// src/lib/mongo/connect.ts
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion, MongoClientOptions } from 'mongodb';

// Ensure the URI is set in the environment variables
const uri = process.env.NEXT_PUBLIC_URI;
if (!uri) throw new Error('MongoDB URI is missing in environment variables');

let client
let clientPromise: Promise<MongoClient>

const options = {
  serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
  }
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

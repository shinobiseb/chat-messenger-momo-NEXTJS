// src/lib/mongo/connect.ts
import mongoose from 'mongoose';

// Ensure the URI is set in the environment variables
const uri = process.env.NEXT_PUBLIC_URI;
if (!uri) throw new Error('MongoDB URI is missing in environment variables');

// Declare a global variable to hold the MongoDB client promise
declare global {
  var _mongooseConnectionPromise: Promise<typeof mongoose>;
}

let connectionPromise: Promise<typeof mongoose>;

if (process.env.NODE_ENV === 'production') {
  // In production, use a single connection instance
  connectionPromise = mongoose.connect(uri);
} else {
  // In development, use a global variable to avoid multiple connections
  if (!globalThis._mongooseConnectionPromise) {
    globalThis._mongooseConnectionPromise = mongoose.connect(uri);
  }
  connectionPromise = globalThis._mongooseConnectionPromise;
}

export default connectionPromise;

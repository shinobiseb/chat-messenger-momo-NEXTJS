// src/lib/mongo/connect.ts
import mongoose from 'mongoose';

// Ensure the URI is set in the environment variables
const uri = process.env.NEXT_PUBLIC_URI;
if (!uri) throw new Error('MongoDB URI is missing in environment variables');

// Declare a global variable to hold the MongoDB connection promise
declare global {
  var _mongooseConnectionPromise: Promise<mongoose.Connection>;
}

let connectionPromise: Promise<mongoose.Connection>;

if (process.env.NODE_ENV === 'production') {
  // In production, use a single connection instance
  connectionPromise = mongoose.connect(uri).then(mongooseInstance => mongooseInstance.connection);
} else {
  // In development, use a global variable to avoid multiple connections
  if (!globalThis._mongooseConnectionPromise) {
    globalThis._mongooseConnectionPromise = mongoose.connect(uri).then(mongooseInstance => mongooseInstance.connection);
  }
  connectionPromise = globalThis._mongooseConnectionPromise;
}

export default connectionPromise;

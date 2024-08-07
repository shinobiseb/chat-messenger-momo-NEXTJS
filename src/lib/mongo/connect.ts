// src/app/api/database/route.ts
import { NextResponse } from 'next/server';
import mongoose, { ConnectOptions } from 'mongoose'
import { MongoClient } from 'mongodb';

if (!process.env.NEXT_PUBLIC_URI) throw new Error('Missing URI! Check .env or variable name')

const uri = process.env.NEXT_PUBLIC_URI;
if (!uri) throw new Error(`Something's wrong with the URI! URI is ${uri}`)

const client = new MongoClient(uri)
let clientPromise;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV !== 'production') {
  if (!globalThis._mongoClientPromise) {
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise as Promise<MongoClient>
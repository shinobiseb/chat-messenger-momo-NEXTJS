import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongo/connect";

export async function GET() {
    const uri = process.env.NEXT_PUBLIC_URI;

    if (!uri) {
        return NextResponse.json({ error: 'URI is missing' }, { status: 400 });
    }

    const client = await clientPromise

    try {
        await client.connect();
        const db = client.db('Momo-Data');
        const collection = db.collection('users');
        const users = await collection.find().toArray();

        return NextResponse.json({users, success: true})
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function POST() {
    
}
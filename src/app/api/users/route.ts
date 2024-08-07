import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongo/connect";

const uri = process.env.NEXT_PUBLIC_URI;

async function main() {
    if (!uri) return;
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db('Momo-Data');
        const collection = db.collection('users');
        
        console.log(collection);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }

    return 
}

main().catch(console.error);
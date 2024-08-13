import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongo/connect";
import { ObjectId } from "mongodb";

export async function GET() {
    const uri = process.env.NEXT_PUBLIC_URI;
    if (!uri) {
        return NextResponse.json({ error: 'URI is missing' }, { status: 400 });
    }

    const client = await clientPromise

    try {
        await client.connect();
        const db = client.db('Momo-Data');
        const collection = db.collection('chats');
        const chats = await collection.find().toArray();

        return NextResponse.json({chats, success: true})
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
    } finally {
        await client.close();
    }
}

///////////////////////
//POST REQUEST FUNCTION
///////////////////////

export async function POST(req: NextRequest) {
    const uri = process.env.NEXT_PUBLIC_URI;
    if (!uri) return NextResponse.json({ error: 'URI is missing' }, { status: 400 });
    const client = await clientPromise;

    try {
        await client.connect();
        const body = await req.json();
        const pointer = await client.db('Momo-Data').collection('chats').insertOne({
            messages: [],
            ...body // Include any additional data from the request body
        });
        console.log(body, pointer);
        return NextResponse.json({ message: 'Successfully updated chats', pointer });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
    } finally {
        await client.close(); 
    }
}
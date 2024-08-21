// src/app/api/chats/route.ts
import { NextResponse, NextRequest } from "next/server";
import connectionPromise from "@/lib/mongo/connect";

/////////////////////////
// GET REQUEST FUNCTION //
/////////////////////////
export async function GET() {
    try {
        const mongooseConnection = await connectionPromise;

        // Check and log the connection status
        if (!mongooseConnection || mongooseConnection.readyState !== 1) {
            console.error('MongoDB connection is not established');
            throw new Error('MongoDB connection is not established');
        }

        const chatCollection = mongooseConnection.db.collection('chats'); // Access the collection

        // Log collection details
        console.log('Accessing collection:', chatCollection.collectionName);

        const chats = await chatCollection.find().toArray(); // Fetch all documents
        console.log('Fetched chats:', chats);

        return NextResponse.json({ chats, success: true });
    } catch (error) {
        console.error('Error fetching chats:', error);
        return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
    }
}



//////////////////////////
// POST REQUEST FUNCTION //
//////////////////////////
export async function POST(req: NextRequest) {
    try {
        const mongooseConnection = await connectionPromise;
        const chatCollection = mongooseConnection.db.collection('chats'); // Access the collection
        const body = await req.json();

        const newChat = {
            messages: [],
            ...body
        };

        const result = await chatCollection.insertOne(newChat); // Insert the new document

        console.log('New Chat ID:', result.insertedId); // Get the inserted document's ID
        return NextResponse.json({ message: 'Successfully created chat', chatId: result.insertedId });
    } catch (error) {
        console.error('Error creating chat:', error);
        return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 });
    }
}

//////////////////////////
// DELETE REQUEST FUNCTION //
//////////////////////////
export async function DELETE(req: NextRequest) {
    try {
        const mongooseConnection = await connectionPromise;
        const chatCollection = mongooseConnection.db.collection('chats'); // Access the collection
        const result = await chatCollection.deleteMany({}); // Delete all documents

        return NextResponse.json({ message: 'All chats deleted', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting chats:', error);
        return NextResponse.json({ error: 'Failed to delete chats' }, { status: 500 });
    }
}

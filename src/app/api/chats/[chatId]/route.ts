import clientPromise from "@/lib/mongo/connect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const { chatId } = await params; // Await the promise
    const client = await clientPromise;

    if (!ObjectId.isValid(chatId)) {
      return NextResponse.json({ success: false, error: 'Invalid chat ID' }, { status: 400 });
    }

    const chat = await client.db('MauChat').collection('chats').findOne({ _id: new ObjectId(chatId) });

    if (!chat) {
      return NextResponse.json({ success: false, error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, chat });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch chat' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const { chatId } = await params; 
    const client = await clientPromise;
    
    if (!chatId || !ObjectId.isValid(chatId)) {
      return NextResponse.json({ success: false, error: 'Valid ID required' }, { status: 400 });
    }

    const result = await client.db('MauChat').collection('chats').deleteOne({ 
      _id: new ObjectId(chatId) 
    });
    
    return NextResponse.json({ success: result.deletedCount > 0 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const { chatId } = await params; // Await the promise
    const { sender, content } = await request.json();

    if (!sender || !content) {
      return NextResponse.json({ success: false, error: 'Missing content' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('MauChat');
    const collection = db.collection('chats');

    const result = await collection.updateOne(
      { _id: new ObjectId(chatId) },
      { 
        $push: { 
          messages: { 
            id: new ObjectId().toString(),
            sender, 
            content, 
            timestamp: new Date()
          } 
        } as any
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
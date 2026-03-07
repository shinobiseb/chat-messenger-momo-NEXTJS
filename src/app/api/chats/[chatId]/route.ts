import clientPromise from "@/lib/mongo/connect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId, Collection } from "mongodb";
import { Chat, Message } from "@/types/types";

export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    const client = await clientPromise;
    const { chatId } = params;

    if (!ObjectId.isValid(chatId)) {
      return NextResponse.json({ success: false, error: 'Invalid chat ID' });
    }

    const chat = await client.db('MauChat').collection('chats').findOne({ _id: new ObjectId(chatId) });

    if (!chat) {
      return NextResponse.json({ success: false, error: 'Chat not found' });
    }

    // Return the chat data if found
    return NextResponse.json({ success: true, chat });
  } catch (error) {
    console.error('Error fetching chat:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch chat' });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { chatId: string } }) {
  const { chatId } = params;
  const { sender, content } = await request.json();

  const client = await clientPromise;
  const db = client.db('MauChat');

  // Explicitly typing the collection prevents the "ArrayOperator" confusion
  const collection = db.collection<Chat>('chats');

  const result = await collection.updateOne(
    { _id: new ObjectId(chatId) as any }, // 'as any' bypasses the _id type conflict we saw earlier
    { 
      $push: { 
        messages: { 
          id: new ObjectId().toString(),
          sender, 
          content, 
          timestamp: new Date()
        } 
      } 
    }
  );

  return NextResponse.json({ success: true });
}
import clientPromise from "@/lib/mongo/connect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const cursor = await client.db('Momo-Data').collection('chats').find();
    const chats = await cursor.toArray();
    return NextResponse.json({ chats });
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch chats' });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const body = await request.json();
    const cursor = await client.db('Momo-Data').collection('chats').insertOne({
      messages: [],
      participants: body.participants
    });
    return NextResponse.json({ id: cursor.insertedId, success: true });
  } catch (error) {
    console.error('Error creating chat:', error);
    return NextResponse.json({ success: false, error: 'Failed to create chat' });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const result = await client.db('Momo-Data').collection('chats').deleteMany({});
    
    if (result.deletedCount > 0) {
      return NextResponse.json({ success: true, message: 'All chats deleted successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'No chats found to delete' });
    }
  } catch (error) {
    console.error('Error deleting chats:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete chats' });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const { chatId, messages } = await request.json();
    if (!ObjectId.isValid(chatId)) {
      return NextResponse.json({ success: false, error: 'Invalid chat ID' });
    }

    const result = await client.db('Momo-Data').collection('chats').updateOne(
      { _id: ObjectId.createFromHexString(chatId) },
      { $set: { messages } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Chat not found' });
    }

    return NextResponse.json({ success: true, message: 'Chat updated successfully' });
  } catch (error) {
    console.error('Error updating chat:', error);
    return NextResponse.json({ success: false, error: 'Failed to update chat' });
  }
}

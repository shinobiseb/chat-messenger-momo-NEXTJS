import clientPromise from "@/lib/mongo/connect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const chats = await client
      .db('MauChat')
      .collection('chats')
      .find({ participants: session.user.email }) 
      .toArray();

    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { recipientEmail } = await request.json();
    if (!recipientEmail) {
      return NextResponse.json({ error: "Recipient email required" }, { status: 400 });
    }

    const client = await clientPromise;
    const result = await client.db('MauChat').collection('chats').insertOne({
      messages: [],
      participants: [session.user.email, recipientEmail],
      createdAt: new Date(),
      lastUpdated: new Date()
    });

    return NextResponse.json({ id: result.insertedId, success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create chat' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatId, messages } = await request.json();

    if (!chatId || !ObjectId.isValid(chatId)) {
      return NextResponse.json({ error: "Invalid Chat ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('MauChat');

    const result = await db.collection('chats').updateOne(
      { 
        _id: new ObjectId(chatId), 
        participants: session.user.email 
      },
      { 
        $set: { 
          messages, 
          lastUpdated: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Chat not found or Access Denied" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
  }
}
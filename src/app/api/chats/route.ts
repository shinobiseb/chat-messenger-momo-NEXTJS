import clientPromise from "@/lib/mongo/connect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const chats = await client
      .db('MauChat')
      .collection('chats')
      .find({ participants: session.user.email }) 
      .toArray();

      return NextResponse.json(chats)
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch' });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const body = await request.json();

    const newChat = await client.db('MauChat').collection('chats').insertOne({
      messages: [],
      participants: [ session.user.email, body.recipientEmail ],
      createdAt: new Date(),
      lastMessage: null
    })

    return NextResponse.json({ id: newChat.insertedId, success: true });
    
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create chat' });
  }
}

// export async function DELETE(request: NextRequest) {
//   try {
//     const client = await clientPromise;
//     const result = await client.db('Momo-Data').collection('chats').deleteMany({});
    
//     if (result.deletedCount > 0) {
//       return NextResponse.json({ success: true, message: 'All chats deleted successfully' });
//     } else {
//       return NextResponse.json({ success: false, message: 'No chats found to delete' });
//     }
//   } catch (error) {
//     console.error('Error deleting chats:', error);
//     return NextResponse.json({ success: false, error: 'Failed to delete chats' });
//   }
// }

export async function PUT(request: NextRequest) {
  const session = await auth();
  const { chatId, messages } = await request.json();
  
  const client = await clientPromise;
  const db = client.db('MauChat');

  const chat = await db.collection('chats').findOne({
    _id: new ObjectId(chatId),
    participants: session?.user?.email
  });

  if (!chat) {
    return NextResponse.json({ error: "Chat not found or Access Denied" }, { status: 404 });
  }

  await db.collection('chats').updateOne(
    { _id: new ObjectId(chatId) },
    { $set: { messages, lastUpdated: new Date() } }
  );

  return NextResponse.json({ success: true });
}

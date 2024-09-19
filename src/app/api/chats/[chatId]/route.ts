import clientPromise from "@/lib/mongo/connect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId, Collection } from "mongodb";
import { Message } from "@/types/types";

export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    const client = await clientPromise;
    const { chatId } = params;

    // Check if the chatId is a valid ObjectId
    if (!ObjectId.isValid(chatId)) {
      return NextResponse.json({ success: false, error: 'Invalid chat ID' });
    }

    // Find the chat with the specific chatId
    const chat = await client.db('Momo-Data').collection('chats').findOne({ _id: new ObjectId(chatId) });

    // If no chat is found, return an error response
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

export async function PUT(request: NextRequest, { params }: { params: { chatId: string } }): Promise<NextResponse> {
  try {
    const client = await clientPromise;
    const db = client.db('Momo-Data');
    const collection: Collection = db.collection('chats');

    const chatId = params.chatId;
    const newMessage : Message = await request.json();

    if (!newMessage || typeof newMessage.sender !== 'string' || typeof newMessage.content !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid message format' });
    }

    // Fetch the current document
    const currentDoc = await collection.findOne({ _id: new ObjectId(chatId) });

    if (!currentDoc) {
      return NextResponse.json({ success: false, error: 'Chat not found' });
    }

    // Modify the messages array
    const updatedMessages = currentDoc.messages ? [...currentDoc.messages, newMessage] : [newMessage];

    // Update the document
    const result = await collection.updateOne(
      { _id: new ObjectId(chatId) },
      { $set: { messages: updatedMessages } }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ success: true, message: 'Chat updated successfully' });
    } else {
      return NextResponse.json({ success: false, error: 'No chat found to update' });
    }
  } catch (error) {
    console.error('Error updating chat:', error);
    return NextResponse.json({ success: false, error: 'Failed to update chat' });
  }
}
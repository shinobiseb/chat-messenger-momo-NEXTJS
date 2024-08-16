// src/app/api/chats/route.ts
import { NextResponse, NextRequest } from "next/server";
import connectionPromise from "@/lib/mongo/connect";
import mongoose from 'mongoose';

// Define the Chat schema and model
const ChatSchema = new mongoose.Schema({
    messages: [Object],
    participants: [String]
});

const ChatModel = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);

/////////////////////////
// GET REQUEST FUNCTION //
/////////////////////////
export async function GET() {
    try {
        const mongooseConnection = await connectionPromise;
        const chats = await ChatModel.find().lean(); 

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
        const body = await req.json();

        const newChat = new ChatModel({
            messages: [],
            ...body // Include any additional data from the request body
        });

        const savedChat = await newChat.save();

        console.log('New Chat:', savedChat);
        return NextResponse.json({ message: 'Successfully created chat', chat: savedChat });
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
        const result = await ChatModel.deleteMany({});

        return NextResponse.json({ message: 'All chats deleted', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting chats:', error);
        return NextResponse.json({ error: 'Failed to delete chats' }, { status: 500 });
    }
}

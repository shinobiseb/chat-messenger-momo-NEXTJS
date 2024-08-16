// src/app/api/users/route.ts
import { NextResponse, NextRequest } from "next/server";
import connectionPromise from "@/lib/mongo/connect";
import UserModel from "../../../../assets/Models";

export async function GET() {
    try {
        // Get the connection
        const connection = await connectionPromise;

        // Use Mongoose model to find users
        const users = await UserModel.find().exec();

        return NextResponse.json({ users, success: true });
    } catch (error) {
        console.error('Error retrieving users:', error);
        return NextResponse.json({ error: 'Failed to retrieve users' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Get the connection
        const connection = await connectionPromise;

        const body = await req.json();
        const { userName, password, email, profilePic } = body;

        // Create a new user instance
        const newUser = new UserModel({
            userName,
            password,
            email,
            profilePic,
            chats: [], 
        });

        // Save the new user
        const savedUser = await newUser.save();

        console.log('New User:', savedUser);
        return NextResponse.json({ message: 'Successfully created user', user: savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

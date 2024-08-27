// src/app/api/users/route.ts
import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongo/connect";
import UserModel from "../../../../assets/Models";

export async function GET() {
    try {
        // Get the connection
        const client = await clientPromise;
        const cursor = await client.db('Momo-Data').collection('users').find();
        const users = await cursor.toArray();
        return NextResponse.json({ users, success: true });
    } catch (error) {
        console.error('Error retrieving users:', error);
        return NextResponse.json({ error: 'Failed to retrieve users' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const client = await clientPromise;
        const body = await req.json();
        const cursor = await client.db('Momo-Data').collection('users').insertOne({
            email: body.email,
            userName: body.userName,
            password: body.password,
            profilePic: body.profilePic,
        })
        return NextResponse.json({ id: cursor.insertedId, success: true });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

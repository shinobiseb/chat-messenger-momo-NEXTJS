// src/app/api/your-route/route.ts

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_URI;

async function createUserCollection(client: MongoClient, userObject: Object) {
    const result = await client.db("Momo-data").collection("users").insertOne(userObject);
    console.log(`New Collection created with the following id: ${result.insertedId}`);
}

export async function POST(request: Request) {
    if (uri) {
        try {
            const client = new MongoClient(uri);
            await client.connect();
            await createUserCollection(client, {
                "userName": "Alice",
                "chats": [],
            });
            await client.close();
            return NextResponse.json({ message: 'User created successfully' }, { status: 200 });
        } catch (error) {
            console.error('Connection Failure: ' + error);
            return NextResponse.json({ error: 'Error connecting to database' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Database URI not set' }, { status: 500 });
    }
}

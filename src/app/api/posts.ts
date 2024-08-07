import clientPromise from "@/lib/mongo/connect";
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "querystring";
import axios from "axios";

export async function handler(req: NextRequest, res: NextResponse) {
    const client = await clientPromise;
    const db = client.db("Momo-Data")
    switch(req.method) {
        case "POST":
            try {
                let bodyObject = await req.json()
                let result = await db.collection("users").insertOne(bodyObject)
                return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
                break
            } catch (error) {
                console.error(error)
                return NextResponse.json({ error: "Failed to Insert Post"}, {status: 500})
            }
            case "GET":
                try {
                    const allPosts = await db.collection("users").find({}).toArray();
                    return NextResponse.json({ status: 200, data: allPosts });
                } catch (error) {
                    console.error(error);
                    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
                }
            default:
                return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
}

export default handler
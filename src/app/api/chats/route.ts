import clientPromise from "@/lib/mongo/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
  const client = await clientPromise
  const cursor = await client.db('Momo-Data').collection('chats').find()
  const chats = await cursor.toArray()
  console.log(chats)
  console.log('This is Client Promise: ')
  console.log(clientPromise)
  return NextResponse.json({ chats })
}
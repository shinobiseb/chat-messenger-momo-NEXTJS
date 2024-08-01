// src/app/api/database/route.ts
import { NextResponse } from 'next/server';
import mongoose, { ConnectOptions } from 'mongoose'
import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_URI;

// const UserSchema = new mongoose.Schema({
//   id: Number,
//   userName: String,
//   chats: Array<Object>,
//   profilePicture: String,
// })

// const User = mongoose.model('User', UserSchema)

async function listMyDatabases(client: MongoClient) {
  const databasesList = await client.db().admin().listDatabases()

  console.log("Databases: ")
  databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}

async function createUserCollection(client: MongoClient, userObject: Object) {
  const result = await client.db("ChatMessengerMomo")
}

export async function GET() {
  if (uri) {
    try {
      const client = new MongoClient(uri)
      await client.connect()
      await listMyDatabases(client)
      await client.close()

      return NextResponse.json({ message: 'Mongoose Connection Complete' });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: 'Error connecting to database' }, { status: 500 });
    }
  } else {
    console.error(`You can't do anything right`);
    return NextResponse.json({ error: `You can't do anything right` }, { status: 400 });
  }
}
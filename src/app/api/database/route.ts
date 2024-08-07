// src/app/api/database/route.ts
import { NextResponse } from 'next/server';
import mongoose, { ConnectOptions } from 'mongoose'
import { MongoClient } from 'mongodb';



if(!process.env.NEXT_PUBLIC_URI) {
  throw new Error('Missing URI! Check .env or variable name')
}

const uri = process.env.NEXT_PUBLIC_URI;


// async function listMyDatabases(client: MongoClient) {
//   const databasesList = await client.db().admin().listDatabases()
//   console.log("Databases: ")
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`))
// }

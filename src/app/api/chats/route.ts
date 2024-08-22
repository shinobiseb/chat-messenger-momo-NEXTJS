import { MongoClient } from 'mongodb'

const uri = process.env.NEXT_PUBLIC_URI
if(!uri){
    throw new Error("environment variable MONGO_URI is not defined");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const cursor = await client.db("Momo-Data").collection("users").find();
      const array = await cursor.toArray()
      return array;
    } finally {
      await client.close();
    }
  }
export async function GET(request: Request) {
    const greetings =  await run();
    return Response.json(greetings)
  }
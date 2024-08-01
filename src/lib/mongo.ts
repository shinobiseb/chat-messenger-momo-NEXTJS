// lib/mongodb.ts
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const uri: string | undefined = process.env.NEXT_PUBLIC_URI;

const connectMongo = async (): Promise<void> => {
  if (!uri) {
    console.error('MongoDB URI is not defined in .env.local');
    return;
  }


  try {
    await mongoose.connect(uri);
    console.log('Mongoose Connection Complete');
  } catch (error) {
    console.error('Error: ' + (error as Error).message);
  }
};

export default connectMongo;

// test-connection.ts
import mongoose from 'mongoose';

const uri = process.env.NEXT_PUBLIC_URI || 'mongodb://localhost:27017/Momo-Data'; // Replace with your actual URI

async function testConnection() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
        const db = mongoose.connection.db;
        const chatsCollection = db.collection('chats');
        const chats = await chatsCollection.find().toArray();
        console.log('Chats:', chats);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await mongoose.disconnect();
    }
}

export default testConnection;
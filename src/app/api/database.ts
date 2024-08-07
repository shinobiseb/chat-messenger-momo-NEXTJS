require('dotenv').config();
import mongoose from 'mongoose'
import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

console.log(uri)

console.log('Connected to API Folder')

export default async () => {
    if(uri) {
        try {
            

            await mongoose.connect(uri)
            console.log('Mongoose Connection Complete')
        } catch (error) {
            console.error('Error: ' + error)
    }
    } else {
        console.error(`You can't do anything right`)
    }
}
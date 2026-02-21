import React from 'react';
import 'ldrs/ring'
import Sidebar from '../../../../components/Sidebar';
import clientPromise from '@/lib/mongo/connect';

//------- Custom JSX Stuff -------
declare namespace JSX {
  interface IntrinsicElements {
    'l-ping': any;
  }
}

export default function Page() {

  async function getUserInfo(  ) {
    const client = await clientPromise;

    const db = client.db("MauChat")
    const usersCollection = db.collection("users")

    const allUsers = await usersCollection.find({}).toArray();
    
    console.log(allUsers)
  }

  getUserInfo()

  return (
    <main className='border border-black w-full h-full'>
      <Sidebar/>
    </main>
  );
}

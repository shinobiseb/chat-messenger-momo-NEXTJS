"use client"

import './globals.css'
import { useState } from 'react';
import Welcome from '../../components/Welcome';
import ActiveChatList from '../../components/ActiveChatList';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

function App() {
  const [signedIn, setSignedIn] = useState(true)
  console.log(process.env.NEXT_PUBLIC_URI)

  return (
    <main className="bg-black w-screen h-screen flex justify-center items-center">
      {
        !signedIn ? 
        <Welcome 
        setSignedIn={setSignedIn} 
        signInState={signedIn}/> : 
        <ActiveChatList/>
      }
    </main>
  );
}

export default App;
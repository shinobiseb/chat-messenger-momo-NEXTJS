"use client"

import './globals.css'
import { useState } from 'react';
import Welcome from '../../components/Welcome';
import ChatWindow from '../../components/ChatWindow';

function App() {

  const [signedIn, setSignedIn] = useState(false);
  console.log(signedIn)

  return (
    <main className="bg-black w-screen h-screen flex justify-center items-center">
      {!signedIn ? 
      <Welcome setSignedIn={setSignedIn} signInState={signedIn} /> : <ChatWindow/>
      }
    </main>
  );
}

export default App;
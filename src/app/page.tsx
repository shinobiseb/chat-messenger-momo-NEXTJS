"use client"

import './globals.css'
import { useState } from 'react';
import Welcome from '../../components/Welcome';
import ChatWindow from '../../components/ChatWindow';
import ActiveChatList from '../../components/ActiveChatList';

function App() {

  const [signedIn, setSignedIn] = useState(true);
  console.log(signedIn)

  return (
    <main className="bg-black w-screen h-screen flex justify-center items-center">
      {!signedIn ? 
      <Welcome setSignedIn={setSignedIn} signInState={signedIn} /> : <ActiveChatList/>
      }
    </main>
  );
}

export default App;
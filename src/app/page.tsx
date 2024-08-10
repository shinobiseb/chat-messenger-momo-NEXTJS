"use client"

import './globals.css'
import { useState } from 'react';
import Welcome from '../../components/Welcome';
import ActiveChatList from '../../components/ActiveChatList';

function App() {
  const [signedIn, setSignedIn] = useState(false)

  return (
    <main className="w-screen h-screen flex justify-center items-center">
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
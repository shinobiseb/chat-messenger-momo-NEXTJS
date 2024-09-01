"use client"

import React, { useEffect, useState } from 'react';
import Header from './Header';
import ChatBox from './ChatBox';
import TextBox from './TextBox';
import { MessageReq } from '@/types/types';
import { DevMessages } from '../assets/DevMessages';
import { signInProps } from '@/types/types';
import { Message } from '@/types/types';

export default function ChatWindow() {
  const [messagingContact, setMessagingContact] = useState({
    userName: 'Momo',
    profilePic: 'https://i.pinimg.com/474x/2b/aa/60/2baa60f0bc5ff69ff16ce5b40e63e377.jpg'
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello, how are you?",
      sent: true,
      timestamp: new Date("2024-09-01T10:00:00Z")
    },
    {
      id: "2",
      content: "I'm good, thanks! How about you?",
      sent: false,
      timestamp: new Date("2024-09-01T10:01:00Z")
    },
    {
      id: "3",
      content: "I'm doing well, just working on some projects.",
      sent: true,
      timestamp: new Date("2024-09-01T10:02:00Z")
    },
    {
      id: "4",
      content: "That sounds interesting. What projects are you working on?",
      sent: false,
      timestamp: new Date("2024-09-01T10:03:00Z")
    },
    {
      id: "5",
      content: "I'm developing a chat application and a few other things.",
      sent: true,
      timestamp: new Date("2024-09-01T10:04:00Z")
    }
  ]);


  useEffect(() => {

  }, [messages]);

  return (
    <main className='w-full h-screen font-roboto-black'>
      <Header 
        profilePic={messagingContact.profilePic}
        userName={messagingContact.userName}
      />
      <section className='h-full w-full flex-col flex overflow-auto'>
        <ChatBox messages={messages}/>
        <TextBox />
      </section>
    </main>
  );
}
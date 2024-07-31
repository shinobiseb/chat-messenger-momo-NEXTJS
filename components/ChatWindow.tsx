"use client"

import React, { useEffect, useState } from 'react';
import Header from './Header';
import ChatBox from './ChatBox';
import TextBox from './TextBox';
import { MessageReq } from '@/types/types';
import { DevMessages } from '../assets/DevMessages';
import { signInProps } from '@/types/types';

export default function ChatWindow() {

  const [messagingContact, setMessagingContact] = useState({
    userName: 'Momo',
    profilePic: 'https://i.pinimg.com/474x/2b/aa/60/2baa60f0bc5ff69ff16ce5b40e63e377.jpg'
  });

  const [messages, setMessages] = useState<MessageReq[]>([]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages(DevMessages);
    };
  }, [messages]);

  return (
    <main className='w-full h-screen font-roboto-black'>
      <Header 
        profilePic={messagingContact.profilePic}
        userName={messagingContact.userName}
      />
      <section className='h-full w-full flex-col flex overflow-auto'>
        <ChatBox messages={messages} />
        <TextBox />
      </section>
    </main>
  );
}
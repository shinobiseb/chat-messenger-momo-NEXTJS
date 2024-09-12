'use client'

import React, { useEffect, useState } from 'react';
import Header from './Header';
import ChatBox from './ChatBox';
import TextBox from './TextBox';
import { ChatWindowProps } from '@/types/types';
import { useRouter } from 'next/router';

export default function ChatWindow({ messages, userName, chatID }: ChatWindowProps) {
  const [messagingContact, setMessagingContact] = useState({
    userName: userName,
    profilePic: 'https://i.pinimg.com/474x/2b/aa/60/2baa60f0bc5ff69ff16ce5b40e63e377.jpg',
  });

  return (
    <main className='w-full h-screen font-roboto-black'>
      <Header 
        profilePic={messagingContact.profilePic}
        userName={messagingContact.userName}
      />
      <section className='h-full w-full flex-col flex overflow-auto'>
        <ChatBox messages={messages}/>
        <TextBox chatId={chatID}/>
      </section>
    </main>
  );
}

'use client'

import React, { useEffect } from 'react';
import Header from './Header';
import ChatBox from './ChatBox';
import TextBox from './TextBox';
import { ChatWindowProps } from '@/types/types';

export default function ChatWindow({ messages, userName, chatID, currentWebSocket, fetchMessagesFunction }: ChatWindowProps) {

  return (
    <main className='w-full h-screen font-roboto-black'>
      <Header 
        profilePic={''}
        userName={''}
      />
      <section className='h-full w-full flex-col flex overflow-auto'>
        <ChatBox messages={messages}/>
        <TextBox 
        fetchMessagesFunction={fetchMessagesFunction} 
        chatId={chatID}
        currentWebSocket={currentWebSocket}
        />
      </section>
    </main>
  );
}

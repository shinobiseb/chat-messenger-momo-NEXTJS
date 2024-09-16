'use client'

import React from 'react';
import Header from './Header';
import ChatBox from './ChatBox';
import TextBox from './TextBox';
import { ChatWindowProps } from '@/types/types';
import { useEffect } from 'react';

export default function ChatWindow({ messages, userName, chatID, fetchMessagesFunction }: ChatWindowProps) {

  return (
    <main className='w-full h-screen font-roboto-black'>
      <Header 
        profilePic={''}
        userName={''}
      />
      <section className='h-full w-full flex-col flex overflow-auto'>
        <ChatBox messages={messages}/>
        <TextBox fetchMessagesFunction={fetchMessagesFunction} chatId={chatID}/>
      </section>
    </main>
  );
}

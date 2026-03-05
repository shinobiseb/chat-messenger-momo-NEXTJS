import React, { useEffect } from 'react';
import ChatBox from './ChatBox';
import { ChatWindowProps } from '@/types/types';
import TextBox from './TextBox';

export default function ChatWindow({ 
  chatID, 
  messages, 
  currentWebSocket, 
  fetchMessagesFunction 
}: ChatWindowProps) {

  if(messages && chatID && fetchMessagesFunction) return (
    <main className='w-full font-roboto-black'>
      <header className='w-full bg-lightorange h-12 flex items-center justify-center '>
        <h4 className='text-white text-xl'>
          Contact
        </h4>
      </header>
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

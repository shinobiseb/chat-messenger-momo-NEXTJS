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
    <main className='w-full h-full'>
      <section className='h-full w-full max-h-screen flex-col flex'>
              <header className='w-full bg-lightorange h-12 flex items-center justify-center z-20 sticky'>
        <h4 className='text-white text-xl'>
          Contact
        </h4>
      </header>
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

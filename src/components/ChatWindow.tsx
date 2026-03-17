import React, { useEffect } from 'react';
import ChatBox from './ChatBox';
import { ChatWindowProps } from '@/types/types';
import TextBox from './TextBox';
import Header from './Header';

export default function ChatWindow({ 
  chatID, 
  messages, 
  currentWebSocket, 
  recipient,
  fetchMessagesFunction
}: ChatWindowProps) {

  if(!messages || !chatID || !fetchMessagesFunction) {
    console.error("Something's Wrong: ", messages, chatID, fetchMessagesFunction)
    return
  } 

  return (
    <main className='w-full h-full'>
      <section className='h-full w-full max-h-screen flex-col flex'>
        <Header
        recipient={recipient ? recipient : "No User"}
        profilePic={""}
        />
        <ChatBox messages={messages}/>
        <TextBox 
        fetchMessagesFunction={fetchMessagesFunction} 
        chatId={chatID}
        currentWebSocket={currentWebSocket}
        />
        {/* <ProfileChatSidebar/> */}
      </section>
    </main>
  )
}

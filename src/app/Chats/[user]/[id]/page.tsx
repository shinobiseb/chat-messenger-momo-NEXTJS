'use client'

import React, { useEffect, useState } from 'react'
import ChatWindow from '../../../../../components/ChatWindow'
import { Chat, Message } from '@/types/types'
import useCookie from '@/lib/useCookie'

export default function page( { params }: { params : { chatId: string }} ) {
  const [ messages, setMessages ] = useState<Message[]>([]);
  const { getUserNameFromCookies } = useCookie();
  const [currentUserName, setCurrentUserName] = useState<string>('');

  async function fetchMessagesFromChat(chatId: string) {
    try {
      const response = await fetch('/api/chats');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const chats: Chat[] = data.chats;
      const targetChat = chats.find((chat) => chat._id === chatId);
      if(!targetChat) {
        console.error('Target Chat not found')
      } else {
        setMessages(targetChat.messages)
        console.log(messages)
        return targetChat; 
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Error fetching chats: ${err.message}`);
      } else {
        console.error('An unexpected error occurred:', err);
      }
    }
  }

  useEffect(() => {
    let userNameFromCookies = getUserNameFromCookies()
    setCurrentUserName(userNameFromCookies)
    fetchMessagesFromChat(params.chatId);
    console.log(`User is ${currentUserName}`)
}, []);

  return (
    <div>
      <ChatWindow userName={currentUserName} messages={messages}/>
    </div>
  )
}

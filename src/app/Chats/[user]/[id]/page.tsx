'use client'

import React, { useEffect, useState } from 'react'
import ChatWindow from '../../../../../components/ChatWindow'
import { Chat, Message } from '@/types/types'
import { useUserState } from '@/lib/UserStateContext'
import useCookie from '@/lib/useCookie'
import { InferGetStaticPropsType } from 'next'
import { getServerSideProps } from 'next/dist/build/templates/pages'

export default function page( { data }: InferGetStaticPropsType<typeof getServerSideProps>) {
  const [ messages, setMessages ] = useState<Message[]>([])
  const [ chatId, setChatId ] = useState('66ce723ee28c7d9e74356e4e')
  const { getUserNameFromCookies } = useCookie()
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
    fetchMessagesFromChat(chatId);
    let userNameFromCookies = getUserNameFromCookies()
    setCurrentUserName(userNameFromCookies)
    console.log(`User is ${currentUserName}`)
    console.log(typeof(data))
}, []);

  return (
    <div>
      <ChatWindow userName={currentUserName} messages={messages}/>
    </div>
  )
}

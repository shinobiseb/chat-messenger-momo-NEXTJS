import React, { useEffect, useState } from 'react'
import ChatWindow from '../../../../../components/ChatWindow'
import { Chat, Message } from '@/types/types'
import { useUserState } from '@/lib/UserStateContext'
import useCookie from '@/lib/useCookie'
import { InferGetStaticPropsType } from 'next'
import { getServerSideProps } from 'next/dist/build/templates/pages'

export default function page( { data }: InferGetStaticPropsType<typeof getServerSideProps>) {
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

  console.log(data)

  return (
    <div>
      <ChatWindow/>
    </div>
  )
}

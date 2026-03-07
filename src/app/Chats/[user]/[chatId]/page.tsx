'use client'
import React, { useEffect, useState, useCallback } from 'react'
import ChatWindow from '../../../../components/ChatWindow'
import { Chat, IMessage } from '@/types/types'

export default function Page({ params }: { params: { chatId: string, targetUser: string } }) {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null)
  const isDevelopment = process.env.NODE_ENV === 'development'
  const expressServer = process.env.NEXT_PUBLIC_EXPRESS_URL
  const primaryUrl = isDevelopment ? 'ws://localhost:3005' : expressServer

  const fetchMessagesFromChat = useCallback(async (id: string) => {
    if (!id) return;

    try {
      const response = await fetch('/api/chats');
      if (!response.ok) {
        throw new Error(`Failed to fetch chats: ${response.statusText}`);
      }
      const data = await response.json();
      const targetChat = data?.find((chat : Chat) => chat._id === id);

      if (!targetChat) {
        console.warn(`Chat ${id} not found in the current list.`);
        return;
      }
      setMessages(targetChat.messages);

      console.log('%c Chat Synced!', 'color: #2ecc71; font-weight: bold; font-size: 14px;');
      return targetChat;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error(`[fetchMessagesFromChat]: ${errorMessage}`);
    }
  }, []); 

  useEffect(() => {
    fetchMessagesFromChat(params.chatId)
  }, [])

  useEffect(() => {
    if (!primaryUrl) {
      console.error('WebSocket URL is undefined');
      return;
    }

    const socket = new WebSocket(primaryUrl)

    socket.onopen = () => {
      console.log('%cWebSocket connection established', 'color: green; font-weight: bold; font-size: 14px;')
      setWs(socket)
    }

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data)
      if (response.action === 'refetch' && response.chatToRefresh === params.chatId) {
        console.log('Refetch Response Received', response)
        fetchMessagesFromChat(params.chatId)
      }
    }

    socket.onclose = () => {
      console.warn('WebSocket connection closed')
    }

    socket.onerror = (event) => {
      console.error('WebSocket error:', event)
    }

    return () => {
      socket.close()
    }
  }, [primaryUrl]) // Add dependencies

  if(params.chatId && params.targetUser && messages && ws){
    return(
      <div>
        nothing
      </div>
    )
  }

  return (
    <div>
      <ChatWindow
        fetchMessagesFunction={fetchMessagesFromChat}
        chatID={params.chatId}
        recipient={params.targetUser}
        messages={messages}
        currentWebSocket={ws}
      />
    </div>
  )
}
'use client'
import React, { useEffect, useState, useCallback, use } from 'react' // 1. Import 'use'
import ChatWindow from '../../../../components/ChatWindow'
import { Chat, IMessage } from '@/types/types'

// 2. Update the type to expect a Promise
interface PageProps {
  params: Promise<{ chatId: string, targetUser: string }>
}

export default function Page({ params }: PageProps) {
  const unwrappedParams = use(params);
  const chatId = unwrappedParams.chatId || "";
  const targetUser = unwrappedParams.targetUser || "";

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
      return targetChat;

    } catch (err) {
      console.error(`[fetchMessagesFromChat]: ${err}`);
    }
  }, []); 

  // 4. Update dependency array to use the unwrapped chatId
  useEffect(() => {
    fetchMessagesFromChat(chatId)
  }, [chatId, fetchMessagesFromChat])

  useEffect(() => {
    if (!primaryUrl) return;

    const socket = new WebSocket(primaryUrl)

    socket.onopen = () => {
      setWs(socket)
    }

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data)
      if (response.action === 'refetch' && response.chatToRefresh === chatId) {
        fetchMessagesFromChat(chatId)
      }
    }

    socket.onclose = () => console.warn('WebSocket connection closed')
    
    return () => socket.close()
  }, [primaryUrl, chatId, fetchMessagesFromChat]) 

  return (
    <div>
      <ChatWindow
        fetchMessagesFunction={fetchMessagesFromChat}
        chatID={chatId}
        recipient={targetUser}
        messages={messages}
        currentWebSocket={ws}
      />
    </div>
  )
}
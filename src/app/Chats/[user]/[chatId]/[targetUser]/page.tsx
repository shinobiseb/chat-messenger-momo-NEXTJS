'use client'

import React, { useEffect, useState } from 'react'
import ChatWindow from '../../../../../../components/ChatWindow'
import { Chat, MessageReq } from '@/types/types'
import useCookie from '@/lib/useCookie'

export default function Page({ params }: { params: { chatId: string, targetUser: string } }) {
  const [messages, setMessages] = useState<MessageReq[]>([])
  const { getUserNameFromCookies } = useCookie()
  const [currentUserName, setCurrentUserName] = useState<string>('')
  const [ws, setWs] = useState<WebSocket | null>(null)
  const isDevelopment = process.env.NODE_ENV === 'development'
  const expressServer = process.env.NEXT_PUBLIC_EXPRESS_URL

  const primaryUrl = isDevelopment ? 'ws://localhost:3005' : expressServer

  async function fetchMessagesFromChat(chatId: string) {
    try {
      const response = await fetch('/api/chats')
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      const chats: Chat[] = data.chats
      const targetChat = chats.find((chat) => chat._id === chatId)
      if (!targetChat) {
        console.error('Target Chat not found')
      } else {
        setMessages(targetChat.messages)
        console.log('%c FetchMessagesFromChat Fired!', 'font-size: 19px; color: green;')
        return targetChat
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Error fetching chats: ${err.message}`)
      } else {
        console.error('An unexpected error occurred:', err)
      }
    }
  }

  useEffect(() => {
    async function fetchID() {
      try {
        const response = await fetch('ws://localhost:3000/api/socket')
        const { chats }: { chats: Array<Chat> } = await response.json()
        const targetChatID = chats.find((chat: Chat) => chat._id === params.chatId)
        if (!targetChatID) {
          console.error('No Chat Found')
        }
      } catch (error) {
        console.error('Error Occurred: ', error)
      }
    }

    fetchID()

    fetchMessagesFromChat(params.chatId)
    const userNameFromCookies = getUserNameFromCookies()
    setCurrentUserName(userNameFromCookies)
    // console.log(`User is ${userNameFromCookies}`)
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

  return (
    <div>
      <ChatWindow
        fetchMessagesFunction={fetchMessagesFromChat}
        chatID={params.chatId}
        userName={params.targetUser}
        messages={messages}
        currentWebSocket={ws}
      />
    </div>
  )
}
"use client"
import React, { useEffect, useState } from 'react'
import { auth } from '@/auth'
import { SidebarProps } from '@/types/types'
import NewChatButton from './NewChatButton'
import { Chat } from '@/types/types'
import ActiveChat from './ActiveChat'

export default function Sidebar( { user }: SidebarProps ) {  
  const [ loading, setLoading ] = useState(false)
  const [ chats, setChats ] = useState<Chat[]>([])
  const [ email, setEmail ] = useState("")

  const fetchSidebarData  = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/chats/`);
        if (!response.ok) throw new Error("Failed to load");
        const data = await response.json()
        setChats(data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(()=> {
    fetchSidebarData()

    if(user.email){
      setEmail(user.email)
    } 
  }, [])

  return (
    <section className='w-full p-2 sm:w-2/5 h-full flex flex-col overflow-y-auto bg-lightorange'>
      <section className='flex flex-col'>
        <NewChatButton
          currentUserEmail={email}
          fetchSidebarData={fetchSidebarData}
        />
      </section>
      { loading ? <span>Loading</span> : null }
      {
        chats.length > 0 ? 
        <ul>
          {
            chats.map((chat, key : number)=> (
              <ActiveChat
              targetUserName={chat.participants[0] !== user.email ? chat.participants[0] : chat.participants[1]}
              />
            ))
          }
        </ul> :
        <div>
          no chats
        </div>
      }
    </section>
  )
}

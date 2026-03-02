"use client"
import React, { useEffect, useState } from 'react'
import { auth } from '@/auth'
import clientPromise from '@/lib/mongo/connect'
import ActiveChat from './ActiveChat'
import ActiveChatList from './ActiveChatList'
import { IAuthSession } from '@/types/types'
import { SidebarProps } from '@/types/types'
import NewChatButton from './NewChatButton'



export default function Sidebar( { user }: SidebarProps ) {  
  const [ loading, setLoading ] = useState(false)
  const [ chats, setChats ] = useState([])
  const [ email, setEmail ] = useState("")

  useEffect(()=> {
    const fetchSidebarData  = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/chats/`);
        if (!response.ok) throw new Error("Failed to load");
        const data = await response.json()
        setChats(data)

      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    }

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
        />
      </section>
      {
        chats.length > 0 ? 
        <div>
          Chats
        </div> :
        <div>
          no chats
        </div>
      }
    </section>
  )
}

"use client"
import { useEffect, useState } from 'react'
import { SidebarProps } from '@/types/types'
import NewChatButton from './NewChatButton'
import { Chat } from '@/types/types'
import { useParams } from 'next/navigation'
import SignOutButton from './LogOutButton'
import ActiveChatList from './ActiveChatList'
import UserProfile from './UserProfile'
import useMobileHelper from '@/utils/useMobileHelper'

export default function Sidebar( {user} : SidebarProps ) {  
  const [ loading, setLoading ] = useState(false)
  const [ chats, setChats ] = useState<Chat[]>([])
  const [ email, setEmail ] = useState("")
  const width = useMobileHelper();
  
  const isMobile = width !== undefined && width < 500;

  let params = useParams();
  const currentUser = typeof params.user === "string" ? params.user : "";

  let isHidden = isMobile && params.chatId

  const fetchSidebarChats  = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/chats/`);
        if (!response.ok) throw new Error("Failed to load");
        const Chats = await response.json()
        setChats(Chats)
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
  }

  useEffect(()=> {
    fetchSidebarChats()
    if(user.email) setEmail(user.email)
  }, [])

  

  const baseClasses = `transition-transform w-full sm:w-2/5 sm:max-w-sm h-full flex flex-col bg-white py-4 px-4 ${isHidden ? "hidden" : null}`

  return (
    <section className={baseClasses}>
      <section className='flex flex-col w-full'>
        <UserProfile
        user={user}
        />
        <NewChatButton
          currentUserEmail={email}
          fetchSidebarData={fetchSidebarChats}
        />
      </section>
      <h2 className='text-xl font-semibold'>Chats</h2>
      <ActiveChatList
        chats={chats}
        currentUser={currentUser}
        loading={loading}
        user={user}
        fetchSidebarChats={fetchSidebarChats}
      />
      <SignOutButton/>
    </section>
  )
}

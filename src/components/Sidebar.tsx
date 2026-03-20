"use client"
import { useEffect, useState } from 'react'
import { IUser, SidebarProps } from '@/types/types'
import NewChatButton from './NewChatButton'
import { Chat } from '@/types/types'
import { useParams } from 'next/navigation'
import SignOutButton from './LogOutButton'
import ActiveChatList from './ActiveChatList'

export default function Sidebar( {user} : SidebarProps ) {  
  const [ loading, setLoading ] = useState(false)
  const [ chats, setChats ] = useState<Chat[]>([])
  const [ email, setEmail ] = useState("")

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
    if(user.email){
      setEmail(user.email)
    } 
  }, [])

  let params = useParams()
  const currentUser = typeof params.user === "string" ? params.user : "";

  return (
    <section className='w-full sm:w-2/5 sm:max-w-sm h-full flex flex-col bg-white py-4 px-4'>
      <section className='flex flex-col w-full'>
        <aside className='flex items-center'>
          <img className='w-16 rounded-full ' src={user.image ? user?.image : undefined} alt=""/>
          <div className='ml-2'>
            <h3 className='text-xl'>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </aside>
        <NewChatButton
          currentUserEmail={email}
          fetchSidebarData={fetchSidebarChats}
        />
      </section>

      <h2 className='text-xl  font-semibold'>Chats</h2>
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

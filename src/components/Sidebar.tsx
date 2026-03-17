"use client"
import { useEffect, useState } from 'react'
import { SidebarProps } from '@/types/types'
import NewChatButton from './NewChatButton'
import { Chat } from '@/types/types'
import ActiveChat from './ActiveChat'
import { useParams } from 'next/navigation'
import SignOutButton from './LogOutButton'

export default function Sidebar( { user }: SidebarProps ) {  
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
      // console.log(user.email)
      setEmail(user.email)
    } 
  }, [])

  let params = useParams()
  const currentUser = typeof params.user === "string" ? params.user : "";

  return (
    <section className='w-full p-2 sm:w-2/5 sm:max-w-sm h-full flex flex-col overflow-y-auto bg-gray'>
      <section className='flex flex-col'>
        <aside className='flex items-center'>
          <img className='w-16 rounded-full ' src={user.image ? user?.image : ""} alt="" />
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
      { loading ? <span>Loading</span> : null }
      {
        chats.map((chat: Chat) => (
          <ActiveChat
            key={chat._id?.toString()} 
            currentUser={currentUser}
            lastMessage={
              chat.messages.length > 0 
                ? chat.messages[chat.messages.length - 1].content 
                : "Get Chatting"
            }
            targetUserName={
              chat.participants[0] !== user.email 
                ? chat.participants[0] 
                : chat.participants[1]
            }

            fetchSidebarChats={fetchSidebarChats}
            chatId={chat._id?.toString()} 
          />
        ))
      }
      <SignOutButton/>
    </section>
  )
}

import React from 'react'
import ActiveChat from './ActiveChat'
import { FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

function ActiveChatList() {
  return (
    <div className='w-full h-screen flex flex-col overflow-hidden'>
        <header className='flex flex-row items-center justify-between w-full px-4 py-2 top-0 overflow-hidden bg-orange text-white z-10 shadow-lg'>
          <button>
            <HiMenu size={30}/>
          </button>
          <h2 className='text-2xl font-semibold'>MauChat</h2>
          <button>
            <FaSearch size={21}/>
          </button>
        </header>
        <ul className='overflow-y-auto'>
                <ActiveChat 
                userName='Momo' 
                profilePic='https://pbs.twimg.com/profile_images/1555441496278843392/4KcqQrUg_400x400.jpg'
                lastMessage='I love you so much Seb even if the world stopped being the world Id die for you'
                timeSent='2:00'
                />
        </ul>
    </div>
  )
}

export default ActiveChatList
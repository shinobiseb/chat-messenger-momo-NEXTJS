"use client"

import React, { useEffect, useState } from 'react'
import ActiveChat from './ActiveChat'
import { FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

function ActiveChatList() {

  const [chats, setChats] = useState([])

  useEffect(()=> {
    if(chats) {
      console.table(chats)
    }
  }, [chats])

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

        </ul>
    </div>
  )
}

export default ActiveChatList
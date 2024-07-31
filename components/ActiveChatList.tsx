import React from 'react'
import ActiveChat from './ActiveChat'

function ActiveChatList() {
  return (
    <div className='w-full h-screen flex flex-col'>
        <header className='flex flex-row items-center justify-center w-full px-4 py-2 top-0 overflow-hidden bg-orange text-white z-10 shadow-lg'>
            <h2 className='text-2xl'>MauChat</h2>
        </header>
        <ul>
            <li>
                <ActiveChat/>
                <ActiveChat/>
                <ActiveChat/>
                <ActiveChat/>
                <ActiveChat/>
                <ActiveChat/>
            </li>
        </ul>
    </div>
  )
}

export default ActiveChatList
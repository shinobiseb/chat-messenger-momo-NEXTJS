import React from 'react'
import { chatProps } from '@/types/types'

export default function ActiveChat( {userName, profilePic, lastMessage, timeSent } : chatProps ) {

  return (
    <a href="/chats/1">
      <div className='transition bg-orange p-2 flex flex-row m-2 rounded-lg items-center'>
          <img 
          src={profilePic} 
          alt="Profile Picture" 
          className='overflow-hidden rounded-full aspect-square w-14 h-14'
          />
          <ul className='w-5/6 flex flex-col px-2'>
              <section className='w-full flex flex-row justify-between items-center'>
                <h5 className='text-white text-xl'>
                  {userName}
                </h5>
                <span className='text-gray text-sm'>
                  {timeSent}
                </span>
              </section>
              <span className='text-sm italic text-gray truncate'>
                  {lastMessage}
              </span>
          </ul>
      </div>
    </a>
  )
}

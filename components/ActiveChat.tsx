import React from 'react'

export default function ActiveChat() {
  return (
    <a href="/chats/1">
      <div className='hover:bg-lightorange transition bg-orange p-2 flex flex-row m-2 rounded-lg items-center'>
          <img 
          src="https://i.pinimg.com/474x/2b/aa/60/2baa60f0bc5ff69ff16ce5b40e63e377.jpg" alt="" 
          className='overflow-hidden rounded-full aspect-square w-14 h-14'
          />
          <ul className='w-3/4 flex flex-col px-2'>
              <h5     className='text-white text-xl'>
                  User Name
              </h5>
              <span className='text-sm italic text-gray'>
                  Last Message...
              </span>
          </ul>
      </div>
    </a>
  )
}

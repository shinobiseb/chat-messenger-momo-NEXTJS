import React from 'react'
import { AddChatProps, ChatPreview } from '@/types/types'

export default function AddChat(  ) {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      targetUser: formData.get('userName') as string,
      lastMessage: null,
      unreadCount: 0,
    }

    const response = await fetch('http://localhost:3000/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className='w-11/12 h-60 bg-orange rounded-md flex flex-col items-center justify-center absolute shadow-md z-20 left-1/2 top-1/2 transform transition-all -translate-x-1/2 -translate-y-1/2 border border-black'>
    <h3 className='text-white text-3xl mb-3 font-semibold'>
      Create a Chat
    </h3>
    <form onSubmit={handleSubmit} className='flex flex-col justify-between items-center h-1/3 w-full'>
        <input 
        className='rounded-md px-2 py-1 w-5/6' 
        type="text" 
        name='userName' 
        placeholder='User Name'
        required
        />
        <input 
        className='rounded-md bg-white py-1 px-4 mt-2' 
        type='submit' 
        placeholder='Create'
        value='Create'
        />
    </form>
    <button onClick={() => history.back()} className="rounded-md bg-white py-1 px-4 mt-2">Back</button>
  </div>
  )
}

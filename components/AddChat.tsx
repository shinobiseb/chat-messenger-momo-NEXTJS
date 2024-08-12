import React from 'react'
import { AddChatProps } from '@/types/types'

export default function AddChat( { setIsOpen }: AddChatProps ) {

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      username: formData.get('userName')
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
    <div className='w-11/12 h-60 bg-orange rounded-md flex flex-col items-center justify-center self-center m-auto'>
        <h3 className='text-white text-3xl mb-3 font-semibold'>Create a Chat</h3>
        <form className='flex flex-col justify-between items-center h-1/3 w-full'>
            <input 
            className='rounded-md px-2 py-1 w-5/6' 
            type="text" 
            name='userName' 
            placeholder='User Name'
            />
            <input 
            className='bg-white px-2 py-1 rounded-md hover:cursor-pointer' 
            type='submit' 
            placeholder='Create'
            value='Create'
            onSubmit={handleSubmit}
            />
        </form>
    </div>
  )
}

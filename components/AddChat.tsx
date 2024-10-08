'use client'

import React from 'react';
import { AddChatProps } from '@/types/types';
import { useUserState } from '@/lib/UserStateContext';
import { findUser } from '@/app/api/api';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AddChat = ({ setIsOpen, fetchChats }: AddChatProps) => {

  const { userName } = useUserState();

  //-----------HANDLE-SUBMIT-----------//
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const targetUserName = formData.get('userName') as string
    const userExist = await findUser(targetUserName)

    if(!userExist){
      return
    }

    const data = {
      participants: [
        targetUserName, 
        userName
      ]
    };

    const response = await fetch('/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Error creating chat:', response.statusText);
      return;
    };

    fetchChats();
    setIsOpen(false);
  };

  return (
    <div className='w-11/12 max-w-xl h-60 bg-orange rounded-md flex flex-col items-center justify-center absolute shadow-md z-20 left-1/2 top-1/2 transform transition-all -translate-x-1/2 -translate-y-1/2 border border-black'>
      <h3 className='text-white text-3xl mb-3 font-semibold'>
        Create a Chat
      </h3>
      <form onSubmit={handleSubmit} className='flex flex-col justify-between items-center h-1/3 w-full'>
        <input
          className='rounded-md px-2 py-1 w-5/6'
          type='text'
          name='userName'
          placeholder='User Name'
          required
        />
        <input
          className='rounded-md bg-white py-1 px-4 mt-2 hover:cursor-pointer hover:bg-yellow transition-all'
          type='submit'
          value='Create'
        />
      </form>
      <button 
      onClick={() => setIsOpen(false)} 
      className='rounded-md hover:cursor-pointer hover:bg-yellow transition-all bg-white py-1 px-4 mt-2'>
        Close
      </button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AddChat), { ssr: false });
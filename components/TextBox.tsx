import { useUserState } from '@/lib/UserStateContext';
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { textBoxProps } from '@/types/types';
import useCookie from '@/lib/useCookie';

export default function TextBox( { chatId } : textBoxProps ) {
  const [content, setContent] = useState('');
  const { userName } = useUserState();
  const { getUserNameFromCookies } = useCookie()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    console.log('Content: ' + e.target.value);
  };

  const sendMessage = async () => {
    if(content === ''){
      console.warn('Empty Message')
      return
    }

    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: getUserNameFromCookies(),
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Message sent:', result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <input
        className='w-5/6 p-3 rounded-lg shadow-lg self-center focus:outline-none my-2'
        placeholder='Type Message...'
        type='text'
        value={content}
        onChange={handleChange}
      />
      <button
        className='p-2'
        onClick={sendMessage}
      >
        <IoSend size={30} fill='orange' />
      </button>
    </div>
  );
}

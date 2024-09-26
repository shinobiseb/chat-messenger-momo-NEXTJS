import { useUserState } from '@/lib/UserStateContext';
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { textBoxProps } from '@/types/types';
import useCookie from '@/lib/useCookie';
import dynamic from 'next/dynamic';

const TextBox = ( { chatId, fetchMessagesFunction, currentWebSocket } : textBoxProps ) => {
  const [content, setContent] = useState('');
  const { getUserNameFromCookies } = useCookie()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const sendMessage = async () => {
    if(content === ''){
      console.warn('Empty Message');
      return;
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
      // Get the updated messages
      fetchMessagesFunction(chatId);
      setContent('');
      console.log(result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle "Enter" key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='w-full flex flex-row justify-center items-center bg-black'>
      <input
        className='w-5/6 p-2 rounded-lg shadow-lg self-center focus:outline-none my-2'
        placeholder='Type Message...'
        type='text'
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className='p-2'
        onClick={sendMessage}
      >
        <IoSend size={35} fill='orange' />
      </button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(TextBox), { ssr: false });

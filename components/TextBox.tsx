'use client'

import React, { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { textBoxProps } from '@/types/types';
import useCookie from '@/lib/useCookie';
import dynamic from 'next/dynamic';

const TextBox = ({ chatId, fetchMessagesFunction, currentWebSocket }: textBoxProps) => {
  const [content, setContent] = useState('');
  const { getUserNameFromCookies } = useCookie();
  const [loading, setLoading] = useState(false); // Added loading state

  const chatterBox = document.getElementById('chatTextBox')

  const focusTextBox = () => {
    if(!chatterBox){
      return console.error('chatterBox does not exist')
    }

    chatterBox?.focus()
  }

  focusTextBox()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    const user = getUserNameFromCookies();

    if (content.trim() === '') {
      console.warn('Empty Message');
      return;
    }

    if (!currentWebSocket) {
      console.error('Textbox Component: WebSocket is: ', currentWebSocket);
      return;
    }

    setLoading(true); // Set loading state

    // Create the message object
    const newMessage = {
      type: 'NEW_MESSAGE',
      data: {
          chatId: chatId, 
          sender: user,  
          content: content 
      }
    };

    // Send message via WebSocket
    if (currentWebSocket.readyState === WebSocket.OPEN) {
      currentWebSocket.send(JSON.stringify(newMessage));
      console.log('WebSocket Message Sent:', newMessage);
    } else {
      console.error("WebSocket is not open. Ready state: ", currentWebSocket.readyState);
      setLoading(false); // Reset loading state on error
      return;
    }

    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: user,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      fetchMessagesFunction(chatId); // Fetch new messages
      setContent(''); // Clear input after sending
      console.log(result);
      focusTextBox()
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };


  return (
    <div className='w-full flex flex-row justify-center items-center bg-black'>
      <input
        className='w-5/6 p-2 rounded-lg shadow-lg self-center focus:outline-none my-2'
        placeholder='Type Message...'
        id='chatTextBox'
        type='text'
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={loading} // Disable input while loading
      />
      <button
        className='p-2'
        onClick={sendMessage}
        disabled={loading} 
      >
        <IoSend size={35} fill='orange' />
      </button>
      {loading && <span className='ml-2 text-white'>Sending...</span>} {/* Optional loading feedback */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(TextBox), { ssr: false });

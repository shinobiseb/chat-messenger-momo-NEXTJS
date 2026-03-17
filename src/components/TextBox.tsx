'use client'

import React, { useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { textBoxProps } from '@/types/types';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

const TextBox = ({ fetchMessagesFunction, currentWebSocket, chatId } : textBoxProps) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false); 

  const { data } = useSession();

  const chatTextBoxRef = useRef(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {

    if (content.trim() === '') {
      console.warn('Empty Message');
      return;
    }

    if (!currentWebSocket) {
      console.error('Textbox Component: WebSocket is: ', currentWebSocket);
      return;
    }

    setLoading(true);

    // Create the message object
    const newMessage = {
      type: 'NEW_MESSAGE',
      data: {
          chatId: chatId, 
          sender: data?.user?.email,  
          content: content 
      }
    };

    // Send message via WebSocket
    if (currentWebSocket.readyState === WebSocket.OPEN) {
      currentWebSocket.send(JSON.stringify(newMessage));
      console.log('WebSocket Message Sent:', newMessage);
    } else {
      console.error("WebSocket is not open. Ready state: ", currentWebSocket.readyState);
      setLoading(false); 
      return;
    }

    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: data?.user?.email,
          content,
        }),
      });

      if (!response.ok) {
        console.error(response)
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      fetchMessagesFunction(chatId);
      setContent('');
      console.log(result);
      if(result.success == false){
        console.error("Something went wrong: ", result.error)
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='w-full flex flex-row justify-center items-center bg-black'>
      <input
        className='w-5/6 p-2 shadow-lg self-center focus:outline-none my-2'
        placeholder='Type Message...'
        id='chatTextBox'
        ref={chatTextBoxRef}
        type='text'
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      {
        loading ? 
        null :
        <button
        className='p-2'
        onClick={sendMessage}
        disabled={loading} 
        >
          <IoSend size={35} fill='orange'/>
        </button>
      }
      
    </div>
  );
};

export default dynamic(() => Promise.resolve(TextBox), { ssr: false });

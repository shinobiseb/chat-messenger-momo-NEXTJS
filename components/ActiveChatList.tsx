import React, { useEffect, useState } from 'react';
import ActiveChat from './ActiveChat';
import { FaSearch } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';
import AddChat from './AddChat';
import { Chat } from '@/types/types';

function ActiveChatList() {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);

  function chatMapper(chats: Chat[]) {
    return chats.map(chat => (
      <li key={chat._id}>
        <ActiveChat 
          userName={chat.participants[0]} 
          profilePic='https://i.pinimg.com/474x/2b/aa/60/2baa60f0bc5ff69ff16ce5b40e63e377.jpg'
        />
      </li>
    ));
  }
  
  async function fetchChats() {
    try {
      const response = await fetch('/api/chats');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const { chats } = data;
      setChats(chats);
    } catch (err) {
      console.error(`Error fetching chats: ${err}`);
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className='w-full h-screen flex flex-col overflow-hidden'>
      <header className='flex flex-row items-center justify-between w-full px-4 py-2 top-0 bg-orange text-white z-10 shadow-lg'>
        <button>
          <HiMenu size={30}/>
        </button>
        <h2 className='text-2xl font-semibold'>MauChat</h2>
        <button>
          <FaSearch size={21}/>
        </button>
      </header>
      <ul className='overflow-y-auto'>
        { chatMapper(chats) }
      </ul>
      { 
        isOpen || chats.length === 0 ? 
        <AddChat setIsOpen={setIsOpen}/> : 
        null
      }
      <button 
        className='absolute bottom-0 right-0 p-3' 
        onClick={() => setIsOpen(true)}>
        <FaCirclePlus size={45} fill='#F15025'/>
      </button>
      <button 
        onClick={async () => {
          await fetch('/api/chats', { method: 'DELETE' });
        }} 
        className='bg-gray p-2 w-1/4 rounded-md'>
        Delete All Chats
      </button>
    </div>
  );
}

export default ActiveChatList;

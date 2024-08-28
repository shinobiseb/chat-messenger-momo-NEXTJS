import React, { useEffect, useState } from 'react';
import ActiveChat from './ActiveChat';
import { FaSearch } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';
import AddChat from './AddChat';
import { ActiveChatListType, Chat } from '@/types/types';

function ActiveChatList({ user }: ActiveChatListType) {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  function chatMapper(chats: Chat[]) {
    return chats
      .filter(chat => chat.participants && chat.participants.length > 0)
      .map(chat => (
        <li key={chat._id}>
          <ActiveChat 
            userName={chat.participants[0] === user?.userName ? chat.participants[1] : chat.participants[0]} 
            profilePic='https://i.pinimg.com/474x/2b/aa/60/2baa60f0bc5ff69ff16ce5b40e63e377.jpg'
          />
        </li>
      ));
  }
  

  function filterChatsByUser(chats: Chat[], userName: string) {
    return chats.filter(chat => chat.participants.includes(userName));
  }

  useEffect(() => {
    if (user?.userName) {
      setFilteredChats(filterChatsByUser(chats, user.userName));
    }
  }, [chats, user]); // Ensure `chats` and `user` updates trigger the effect

  async function fetchChats() {
    try {
      const response = await fetch('/api/chats');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data);
      setChats(data.chats); // Set chats once data is fetched
    } catch (err) {
      console.error(`Error fetching chats: ${err}`);
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className='w-full h-screen flex flex-col overflow-hidden bg-black'>
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
        { chatMapper(filteredChats) }
      </ul>
      
      { 
        isOpen || chats.length === 0 ? 
        <AddChat setIsOpen={setIsOpen} fetchChats={fetchChats}/> : 
        null
      }

      <button 
        className='absolute bottom-0 right-0 p-3' 
        onClick={() => setIsOpen(true)}>
        <FaCirclePlus size={45} fill='#F15025'/>
      </button>

      { 
        filteredChats.length !== 0 ? 
        <button 
          onClick={async () => {
            await fetch('/api/chats', { method: 'DELETE' });
          }} 
          className='bg-gray p-2 w-40 rounded-md self-center'>
          Delete All Chats
        </button> : 
        null
      }
    </div>
  );
}

export default ActiveChatList;

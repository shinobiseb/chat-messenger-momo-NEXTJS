import React, { useEffect, useState } from 'react';
import ActiveChat from './ActiveChat';
import { FaCirclePlus } from 'react-icons/fa6';
import { ActiveChatListType } from '@/types/types';
import { Chat } from '@/types/types';
import dynamic from 'next/dynamic';

const AddChat = dynamic(() => import('../components/AddChat'), { ssr: false });

function ActiveChatList({ user, chats, fetchChats, handleChatClick }: ActiveChatListType) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  function chatMapper(chats: Chat[]) {
    return chats
      .filter(chat => chat.participants && chat.participants.length > 0 && chat._id !== undefined)
      .map(chat => (
        <li key={chat._id}>
          <ActiveChat 
            targetUserName={ chat.participants[0] === user?.userName ? chat.participants[1] : chat.participants[0] } 
            profilePic=''
            chatId={chat._id}
            onClickFunction={handleChatClick}
            lastMessage={ chat.messages[0] ? chat.messages[chat.messages.length - 1].content : 'Get Chattin' }
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
  }, [chats, user]);

  return (
    <div className='w-full h-screen flex flex-col overflow-hidden bg-black'>
      <header className='flex flex-row items-center justify-center w-full px-4 py-2 top-0 bg-orange text-white z-10 shadow-lg'>
        <h2 className='text-2xl font-semibold'>MauChat</h2>
      </header>
      <span className='text-gray text-center italic py-2'>ATTENTION: Our servers take up to a minute to spin up. Try refreshing if your messages are not sending!</span>
      <span className='text-gray text-center italic py-1'>This is a prototype - please do not send sensitive data</span>
      <ul className='overflow-y-auto overflow-x-hidden'>
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
    </div>
  );
}

export default ActiveChatList;

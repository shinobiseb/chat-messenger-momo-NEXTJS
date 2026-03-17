'use client'

import { ActiveChatType } from '@/types/types';
import Link from 'next/link';
import DeleteChatButton from './DeleteChatButton';


export default function ActiveChat(
  { currentUser, targetUserName, chatId, lastMessage, fetchSidebarChats }: ActiveChatType,
) {

  if(!chatId){
    console.error("No Chat ID")
    return
  }

  const chatUrl = `/chats/${currentUser}/${chatId}`;

  return (
  <Link 
  href={chatUrl} className="cursor-pointer"
  scroll={false}
  >
    <div className="transition bg-orange hover:bg-darkgray py-4 px-3 flex flex-col gap-1 text-white border-b border-orange/20">
      
      <div className="flex flex-row justify-between items-center">
        <h5 className="text-md font-semibold truncate pr-4">
          {targetUserName}
        </h5>
      </div>

      <div className="flex flex-row justify-between items-center">
        <span className="text-white/80 italic text-sm truncate pr-4">
          {lastMessage ? lastMessage : 'Get Chatting!'}
        </span>
        <DeleteChatButton
          fetchSidebarChats={fetchSidebarChats}
          chatId={chatId}
        />
      </div>
    </div>
  </Link>
);
}

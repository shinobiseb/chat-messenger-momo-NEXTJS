'use client'

import { ActiveChatType } from '@/types/types';
import Link from 'next/link';
import DeleteChatButton from './DeleteChatButton';
import { useParams } from 'next/navigation';

export default function ActiveChat(
  { currentUser, targetUserName, chatId, lastMessage, fetchSidebarChats, onClickFunction }: ActiveChatType,
) {

  const params = useParams()
  const isActive = params.chatId === chatId

  if(!chatId){
    console.error("No Chat ID")
    return
  }

  const chatUrl = `/chats/${currentUser}/${chatId}`

  return (
  <Link 
  href={chatUrl} 
  className="cursor-pointer"
  scroll={false}
  >
    <div
    className={`transition hover:bg-orange ${isActive ? "bg-orange text-white" : null} py-4 px-3 flex flex-col gap-1 hover:text-white`}>
      
      <div className="flex flex-row justify-between items-center">
        <h5 className="text-md font-semibold truncate pr-4">
          {targetUserName}
        </h5>
      </div>

      <div className="flex flex-row justify-between items-center">
        <span className="italic text-sm truncate pr-4">
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

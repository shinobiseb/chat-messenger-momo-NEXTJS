'use client'

import React from 'react';
import { ActiveChatType } from '@/types/types';
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';

export default function ActiveChat(
  { currentUser, targetUserName, chatId, lastMessage }: ActiveChatType,
) {

  const chatUrl = `/chats/${currentUser}/${chatId}`;

  return (
  <Link 
  href={chatUrl} className="cursor-pointer"
  scroll={false}
  >
    <div className="transition bg-lightorange hover:bg-orange py-4 px-3 flex flex-col gap-1 text-white border-b border-orange/20">
      
      <div className="flex flex-row justify-between items-center">
        <h5 className="text-md font-semibold truncate pr-4">
          {targetUserName ? targetUserName : "No User"}
        </h5>
        {/* <MdMessage size={20} fill="white" className="flex-shrink-0" /> */}
      </div>

      <div className="flex flex-row justify-between items-center">
        <span className="text-white/80 italic text-sm truncate pr-4">
          {lastMessage ? lastMessage : 'Get Chatting!'}
        </span>
        <button 
          className="hover:bg-white/30 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // Prevents clicking 'X' from opening the chat
            // Add delete logic here
          }}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  </Link>
);
}

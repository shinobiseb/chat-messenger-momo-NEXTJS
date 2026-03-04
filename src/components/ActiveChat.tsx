'use client'

import React from 'react';
import { ActiveChatType } from '@/types/types';
import { MdMessage } from "react-icons/md";
import { motion } from 'framer-motion';
import { IoMdClose } from "react-icons/io";

export default function ActiveChat(
  { targetUserName, chatId, onClickFunction, lastMessage }: ActiveChatType,
) {

  return (
  <motion.div className="cursor-pointer">
    <div className="transition bg-lightorange hover:bg-orange py-4 px-3 flex flex-col gap-1 text-white border-b border-orange/20">
      
      {/* Row 1: Name and Message Icon */}
      <div className="flex flex-row justify-between items-center">
        <h5 className="text-md font-semibold truncate pr-4">
          {targetUserName ? targetUserName : "New Chat"}
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
  </motion.div>
);
}

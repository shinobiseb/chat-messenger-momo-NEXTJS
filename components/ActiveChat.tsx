'use client'

import React from 'react';
import { ActiveChatType } from '@/types/types';
import { useUserState } from '@/lib/UserStateContext';
import { useRouter } from 'next/navigation';
import { MdMessage } from "react-icons/md";
import { motion } from 'framer-motion';

export default function ActiveChat(
  { targetUserName, chatId, onClickFunction, lastMessage }: ActiveChatType,
) {
  const { userName } = useUserState();
  const router = useRouter();

  const handleClick = () => {
    if (chatId) {
      onClickFunction(chatId);
      router.push(`/chats/${userName}/${chatId}/${targetUserName}`);
    }
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="cursor-pointer mx-1"
    >
      <div className="transition bg-orange hover:bg-lightorange p-2 sm:py-5 flex flex-row m-2 rounded-lg items-center text-white">
        <div className="w-full sm:w-full flex flex-row px-2">
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              <h5 className="text-xl">{targetUserName}</h5>
              <span className="text-gray italic text-sm">
                {lastMessage ? lastMessage : 'Get Chatting!'}
              </span>
            </div>
          </div>
          <span className="self-center">
            <MdMessage size={35} fill="white" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

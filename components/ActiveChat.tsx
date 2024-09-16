'use client'

import React, { useState } from 'react';
import { ActiveChatType } from '@/types/types';
import { useUserState } from '@/lib/UserStateContext';
import { useRouter } from 'next/navigation';
import { MdMessage } from "react-icons/md";
import { motion } from 'framer-motion'

export default function ActiveChat(
  { targetUserName, chatId, onClickFunction }: ActiveChatType,
) {

  const { userName } = useUserState();
  const router = useRouter();

  const handleClick = () => {
    if(chatId){
      onClickFunction(chatId)
    }
    router.push(`/chats/${userName}/${chatId}`);
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.01,
        transition: { duration: .2 } 
      }}
      whileTap={{
        scale: 0.95
      }}
      onClick={handleClick}
      className="cursor-pointer mx-1 max-w-lg">
      <div className="transition bg-orange hover:bg-lightorange p-2 sm:py-5 flex flex-row m-2 rounded-lg items-center text-white">
        <ul className="w-full sm:w-full flex flex-col px-2">
          <li className="w-full flex flex-row justify-between items-center">
            <h5 className="text-xl">
              {targetUserName}
            </h5>
            <span>
              <MdMessage size={30} fill="white" />
            </span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
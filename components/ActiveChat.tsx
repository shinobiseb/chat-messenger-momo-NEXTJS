'use client'

import React from 'react';
import { ActiveChatType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { MdMessage } from "react-icons/md";
import { motion } from 'framer-motion';

export default function ActiveChat(
  { targetUserName, chatId, onClickFunction, lastMessage }: ActiveChatType,
) {
  const router = useRouter();

  return (
    <motion.div
      // whileHover={{ 
      //   scale: 1.01,
      //   transition: { duration: 0.2 } 
      // }}
      // whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
    >
      <div className="transition bg-darkgray hover:bg-orange p-2 sm:py-5 flex flex-row items-center text-white">
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

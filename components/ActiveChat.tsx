'use client'

import React from 'react';
import { ActiveChatType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { MdMessage } from "react-icons/md";
import { motion } from 'framer-motion';

export default function ActiveChat(
  { targetUserName, chatId, onClickFunction, lastMessage }: ActiveChatType,
) {

  return (
    <motion.div
      className="cursor-pointer"
    >
      <div className="transition bg-lightorange hover:bg-orange py-5 flex flex-row items-center text-white">
        <div className="w-full sm:w-full flex flex-row px-2">
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              <h5 className="text-md">{targetUserName ? targetUserName : "New Chat"}</h5>
              <span className="text-white italic text-sm">
                {lastMessage ? lastMessage : 'Get Chatting!'}
              </span>
            </div>
          </div>
          <span className="self-center">
            <MdMessage size={25} fill="white" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

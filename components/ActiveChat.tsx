import React from 'react';
import { useState } from 'react';
import { ActiveChatType } from '@/types/types';

export default function ActiveChat(
  { userName, profilePic }: ActiveChatType,
) {

  const [ lastMessage, setLastMessage ] = useState('Get Chatting!')
  const [ time, settime ] = useState('8:88 AM')

  return (
    <a href={`/chats/${userName}/1`}>
      <div className="transition bg-orange p-2 flex flex-row m-2 rounded-lg items-center">
        <img
          src={profilePic}
          alt="Profile Picture"
          className="overflow-hidden rounded-full aspect-square w-14 h-14"
        />
        <ul className="w-5/6 sm:w-full flex flex-col px-2">
          <div className="w-full flex flex-row justify-between items-center">
            <h5 className="text-white text-xl">
              {userName}
            </h5>
            <span className="text-gray text-sm">
              {time}
            </span>
          </div>
          <span className="text-xs italic text-gray w-5/6 truncate">
            {lastMessage}
          </span>
        </ul>
      </div>
    </a>
  );
}

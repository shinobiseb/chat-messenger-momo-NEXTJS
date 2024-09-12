import React, { useState } from 'react';
import { ActiveChatType } from '@/types/types';
import { useUserState } from '@/lib/UserStateContext';
import { useRouter } from 'next/navigation';

export default function ActiveChat(
  { targetUserName, profilePic, chatId, onClickFunction }: ActiveChatType,
) {

  const [lastMessage, setLastMessage] = useState('Get Chatting!');
  const [time, setTime] = useState('8:88 AM');
  const { userName } = useUserState();
  const router = useRouter();

  const handleClick = () => {
    if(chatId){
      onClickFunction(chatId)
    }
    router.push(`/chats/${userName}/${chatId}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="transition bg-orange p-2 flex flex-row m-2 rounded-lg items-center">
        <img
          src={profilePic}
          alt="Profile Picture"
          className="overflow-hidden rounded-full aspect-square w-14 h-14"
        />
        <ul className="w-5/6 sm:w-full flex flex-col px-2">
          <div className="w-full flex flex-row justify-between items-center">
            <h5 className="text-white text-xl">
              {targetUserName}
            </h5>
            {/* <span className="text-gray text-sm">
              {time}
            </span> */}
          </div>
          <span className="text-xs italic text-gray w-5/6 truncate">
            {lastMessage}
          </span>
        </ul>
      </div>
    </div>
  );
}

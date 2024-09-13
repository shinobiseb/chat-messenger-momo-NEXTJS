import React, { useState } from 'react';
import { ActiveChatType } from '@/types/types';
import { useUserState } from '@/lib/UserStateContext';
import { useRouter } from 'next/navigation';
import { MdMessage } from "react-icons/md";

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
        <ul className="w-full sm:w-full flex flex-col px-2">
          <li className="w-full flex flex-row justify-between items-center">
            <h5 className="text-white text-xl">
              {targetUserName}
            </h5>
            <span>
              <MdMessage size={30} fill='white'/>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
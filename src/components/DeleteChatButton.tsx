import React from 'react'
import { IoMdClose } from 'react-icons/io';

interface DeleteButtonProps {
    chatId: string
}

export default function DeleteChatButton( {chatId} : DeleteButtonProps) {
  return (
    <button 
      className="hover:bg-white/30 rounded transition-colors"
      onClick={(e) => {
        e.stopPropagation();

      }}
    >
      <IoMdClose />
    </button>
  )
}

"use client"
import { useState } from 'react'
import { BiSend } from "react-icons/bi";
import { TbMessagePlus } from "react-icons/tb";
import { useRef } from 'react';

interface INewChatButton {
  currentUserEmail : string,
  fetchSidebarData : Function
}



export default function NewChatButton({ fetchSidebarData }: INewChatButton) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [ isOpen, setIsOpen ] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateChat();
    }
  };

  const handleCreateChat = async () => {
    setIsOpen(false)
    if(recipientEmail === "" || null) return

    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: recipientEmail,
        }),
      });
      const data = await response.json();

      if (data.success) {
        fetchSidebarData();
        setRecipientEmail(""); 
      } else {
        console.error("Error:", data.error);
      }
      inputRef.current ? inputRef.current.value = "" : null
    } catch (err) {
      console.error("Failed to send POST request", err);
    }
  };

  if(isOpen) return (
    <div className="flex justify-between py-4">
      <input 
        type="email" 
        placeholder="Friend's email..."
        className="p-3 w-full bg-gray"
        onChange={(e) => setRecipientEmail(e.target.value)}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        autoFocus={true}
      />
      <button 
        onClick={handleCreateChat}
        className="flex justify-center items-center px-2"
      >
        <BiSend size={25}/>
      </button>
    </div>
  );
  else return (
    <button onClick={()=> setIsOpen(true)} className='p-3 my-4 flex justify-between transition-colors hover:bg-orange hover:text-white bg-gray'>
      <span className='mr-2'>New Chat</span>
      <TbMessagePlus
        size={25}
      />
    </button>
  )
}
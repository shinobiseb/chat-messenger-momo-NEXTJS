"use client"
import { useState } from 'react'
import { LuMessageCircle } from "react-icons/lu";
import { useRef } from 'react';
import { MessageReq } from '@/types/types';
import { stringify } from 'querystring';
interface INewChatButton {
  currentUserEmail : string,
  fetchSidebarData : Function
}

export default function NewChatButton({ currentUserEmail, fetchSidebarData }: INewChatButton) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateChat = async () => {
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
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else {
        console.error("Error:", data.error);
      }
      inputRef.current ? inputRef.current.value = "" : null
    } catch (err) {
      console.error("Failed to send POST request", err);
    }
  };

  return (
    <div className="flex w-full justify-between py-4">
      <input 
        type="email" 
        placeholder="Friend's email..."
        className="px-3 p-1 rounded-md w-full"
        onChange={(e) => setRecipientEmail(e.target.value)}
        ref={inputRef}
      />
      <button 
        onClick={handleCreateChat}
        className="bg-white mx-1 rounded-full p-2 w-7 flex justify-center items-center"
      >
        <LuMessageCircle/>
      </button>
    </div>
  );
}
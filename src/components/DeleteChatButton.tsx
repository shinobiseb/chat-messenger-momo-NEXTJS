import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface DeleteButtonProps {
    chatId: string;
    fetchSidebarChats?: Function; 
}

export default function DeleteChatButton({ chatId, fetchSidebarChats }: DeleteButtonProps) {
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const confirmed = window.confirm("Are you sure you want to delete this chat?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId }), 
      });

      if (response.ok) {
        fetchSidebarChats?.(chatId);
      } else {
        const errorData = await response.json();
        console.error("Delete failed:", errorData.message);
      }
    } catch (error) {
      console.error("Network error deleting chat:", error);
    }


  };

  return (
    <button 
      className="p-1 hover:bg-white/30 rounded transition-colors flex items-center justify-center text-white"
      onClick={handleDelete}
      aria-label="Delete Chat"
    >
      <IoMdClose size={20} />
    </button>
  );
}
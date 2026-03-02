"use client"
import { useState } from 'react'

export default function NewChatButton({ currentUserEmail }: { currentUserEmail: string }) {
  const [recipientEmail, setRecipientEmail] = useState("");

  const handleCreateChat = async () => {
    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: recipientEmail, // This matches your API's body.recipientEmail
        }),
      });
      const data = await response.json();

      if (data.success) {
        alert("Chat created! ID: " + data.id);
        // Logic to redirect or refresh the list
      } else {
        console.error("Error:", data.error);
      }
    } catch (err) {
      console.error("Failed to send POST request", err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <input 
        type="email" 
        placeholder="Friend's email..."
        className="border p-2 mr-2"
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <button 
        onClick={handleCreateChat}
        className="px-4 py-2 rounded"
      >
        Start Chat
      </button>
    </div>
  );
}
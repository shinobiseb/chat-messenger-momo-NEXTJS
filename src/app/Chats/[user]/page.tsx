'use client'

import React, { useState, useEffect } from 'react';
import ActiveChatList from '../../../../components/ActiveChatList';
import { useUserState } from '@/lib/UserStateContext';
import { useRouter } from 'next/navigation';
import useCookie from '@/lib/useCookie';
import 'ldrs/ring'
import { User, Chat } from '@/types/types';
import { ChatInfo } from '@/types/types';

//------- Custom JSX Stuff -------
declare namespace JSX {
  interface IntrinsicElements {
    'l-ping': any;
  }
}

export default function Page() {
  const { getUserNameFromCookies, setUserNameFromCookies } = useCookie()
  const router = useRouter();
  const { isSignedIn, userName, setUserName } = useUserState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [ selectedChatInfo, setSelectedChatInfo] = useState<ChatInfo>({
    chatId: '',
    messages: [],
    targetUser: '', 
  })

//--------- Click Handle ---------
  async function getChatFromChatId(chatId: string) {
    try {
      const response = await fetch('/api/chats')
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json()
      const { chats } = data
      const targetChat = chats.find((chat: Chat) => chat._id === chatId)
      return targetChat
    } catch (error) {
      console.error(error)
    }
  }

  async function handleChatClick(chatId: string) {
    let targetChat: Chat = await getChatFromChatId(chatId)
    if (targetChat._id) {
      setSelectedChatInfo({
        chatId: targetChat._id,
        messages: targetChat.messages,
        targetUser: targetChat.participants[0] !== userName ? 
          targetChat.participants[0] :
          targetChat.participants[1]
      })
    } else {
      console.error('Chat has no chatId')
    }
  }
//---------- Fetchers ----------
  async function fetchUser() {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const { users } = data;
      const currentUser = users.find((user: User) => user.userName === userName);
      setUserData(currentUser);
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function fetchChats() {
    try {
      const response = await fetch('/api/chats');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setChats(data.chats);
    } catch (err) {
      console.error(`Error fetching chats: ${err}`);
    }
  }

//--------- useEffects ---------
  useEffect(() => {
    console.table(selectedChatInfo);
  }, [selectedChatInfo]);

  useEffect(() => {
    const currentUserName = getUserNameFromCookies();
    if (!currentUserName) {
      setLoading(false);
      router.push('/SignIn');
      console.error('User tried to access chats before User was authenticated')
    } else {
      setUserNameFromCookies(currentUserName);
      fetchUser();
      fetchChats();
      console.log(`Current User Name: ${currentUserName}`);
    }
  }, []);

  useEffect(() => {
    if (!isSignedIn && !loading) {
      console.error('User is not signed in');
      router.push('/SignIn');
    }
  }, [isSignedIn, loading, router]);

//---------- Returns -----------
  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <l-ping
          size="45"
          stroke="2"
          speed="2"
          color="orange"
        >
        </l-ping>
      </div>
    );
  }

  return (
    <div>
      <ActiveChatList
        handleChatClick={handleChatClick}
        user={userData} 
        chats={chats} 
        fetchChats={fetchChats}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import ActiveChatList from '../../../../components/ActiveChatList';
import { useUserState } from '@/lib/UserStateContext';
import { useRouter } from 'next/navigation';
import useCookie from '@/lib/useCookie';
import 'ldrs/ring'
import { User, Chat } from '@/types/types';
import { GetServerSideProps } from 'next';
import { ChatInfo } from '@/types/types';

export const getServerSideProps = (async () => {
  try {
    const response = await fetch('/api/chats');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return { props: { data }}
  } catch (error) {
    console.error('Messed Up in GetServerSideProps Function')
  }
})

export default function Page() {
  const { getUserNameFromCookies, setUserNameFromCookies } = useCookie()
  const router = useRouter();
  const { isSignedIn, userName, setUserName } = useUserState();

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
      return {
        props: {
          chats
        }
      }
    } catch (error) {
      console.error(error)
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
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
    }
  }

  async function fetchChats() {
    try {
      const response = await fetch('/api/chats');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
    } catch (err) {
      console.error(`Error fetching chats: ${err}`);
    }
  }

  useEffect(() => {
    const currentUserName = getUserNameFromCookies();
    if (!currentUserName) {
      router.push('/SignIn');
      console.error('User tried to access chats before User was authenticated')
    } else {
      setUserNameFromCookies(currentUserName);
      fetchUser();
      fetchChats();
      console.log(`Current User Name: ${currentUserName}`);
    }
  }, []);



  return (
    <div>
      <ActiveChatList
      />
    </div>
  );
}

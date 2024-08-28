'use client'

import React, { useState, useEffect } from 'react';
import ActiveChatList from '../../../../components/ActiveChatList';
import { useUserState } from '@/lib/UserStateContext';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/lib/useLocalStorage';
import 'ldrs/ring'
import { User } from '@/types/types';

declare namespace JSX {
  interface IntrinsicElements {
    'l-ping': any;
  }
}

export default function Page() {
  const router = useRouter();
  const { getItem } = useLocalStorage('CurrentUser');
  const { isSignedIn, userName, setUserName } = useUserState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);

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

  useEffect(() => {
    const currentUserName = getItem();
    if (currentUserName) {
      setUserName(currentUserName);
      fetchUser();
      console.log(currentUserName)
    } else {
      setLoading(false);
      router.push('/SignIn');
    }
  }, []);

  useEffect(() => {
    if (!isSignedIn && !loading) {
      console.error('User is not signed in');
      router.push('/SignIn');
    }
  }, [isSignedIn, loading, router]);

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <l-ping
          size="45"
          stroke="2"
          speed="2"
          color="orange"
        ></l-ping>
      </div>
    );
  }

  return (
    <div>
      <ActiveChatList user={userData} />
    </div>
  );
}
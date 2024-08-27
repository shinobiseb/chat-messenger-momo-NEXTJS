'use client'

import React, { useState, useEffect } from 'react';
import ActiveChatList from '../../../../components/ActiveChatList';
import { useUserState } from '@/lib/UserStateContext';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/lib/useLocalStorage';
import 'ldrs/ring'

declare namespace JSX {
  interface IntrinsicElements {
    'l-ping': any;
  }
}

export default function Page() {
  const router = useRouter();
  const { getItem } = useLocalStorage('CurrentUser')
  const { isSignedIn, userName, setUserName } = useUserState();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!isSignedIn && !loading) {
      console.error('User is not signed in');
      router.push('/SignIn');
    } else {
      setLoading(false);
      setUserName(getItem())
      console.log('User is signed in', userName);
    }
  }, [isSignedIn, router]);

  useEffect(() => {

  })

  if (loading) {
    console.log('Loading...')
    return (
      <l-ping
        size="45"
        stroke="2"
        speed="2"
        color="orange" 
      ></l-ping>
    )
  }

  return (
    <div>
      <ActiveChatList />
    </div>
  );
}

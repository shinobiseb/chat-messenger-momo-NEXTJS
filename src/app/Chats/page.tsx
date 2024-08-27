'use client'

import React, { useState, useEffect } from 'react';
import ActiveChatList from '../../../components/ActiveChatList';
import userState from '@/lib/userState';
import { useRouter } from 'next/navigation';
import 'ldrs/ring'

declare namespace JSX {
  interface IntrinsicElements {
    'l-ping': any;
  }
}

export default function Page() {
  const router = useRouter();
  const { isSignedIn, userName, setUserName } = userState();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!isSignedIn && !loading) {
      console.error('User is not signed in');
      router.push('/SignIn');
    } else {
      setLoading(false); 
      console.log('User is signed in', userName);
    }
  }, [isSignedIn, router]);

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

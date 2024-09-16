'use client'

import { useEffect } from "react";
import useCookie from "@/lib/useCookie";
import { useRouter } from 'next/navigation';
import { useUserState } from "@/lib/UserStateContext";
import React from 'react';
import dynamic from 'next/dynamic';

const SignInForm = dynamic(() => import('../../../components/SignInForm'), { ssr: false });

export default function Page() {
  const { getUserNameFromCookies } = useCookie()
  const { isSignedIn } = useUserState()
  const router = useRouter()

  useEffect(()=> {
    let userNameFromCookies = getUserNameFromCookies()
    if(userNameFromCookies && isSignedIn) {
      router.push(`/chats/${userNameFromCookies}`)
      console.log('Username Found')
    }
  }, [])

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <SignInForm/>
    </main>
  );
}
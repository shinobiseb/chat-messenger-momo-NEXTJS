'use client'

import React from 'react';
import dynamic from 'next/dynamic';

const SignUpForm = dynamic(() => import('../../../components/SignUpForm'), { ssr: false });

export default function Page() {
  return (
    <main className='w-full h-full flex items-center justify-center'>
      <SignUpForm/>
    </main>
  );
}

import React from 'react';
import 'ldrs/ring'
import { auth } from '@/auth';
import Sidebar from '../../../../components/Sidebar';
import clientPromise from '@/lib/mongo/connect';
import ChatWindow from '../../../../components/ChatWindow';
import { IAuthSession } from '@/types/types';

//------- Custom JSX Stuff -------
declare namespace JSX {
  interface IntrinsicElements {
    'l-ping': any;
  }
}

export default async function Page( ) {

  const session = await auth()
  console.log(session)

  if(!session?.user) return <>No user Found</>

  return (
    <main className='border border-black w-full h-full'>
      <Sidebar
      user={session.user}
      />
    </main>
  );
}

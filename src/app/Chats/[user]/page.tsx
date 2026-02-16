'use client'

import React, { useState, useEffect } from 'react';
import ActiveChatList from '../../../../components/ActiveChatList';
import { useRouter } from 'next/navigation';
import 'ldrs/ring'
import { User, Chat } from '@/types/types';

//------- Custom JSX Stuff -------
declare namespace JSX {
  interface IntrinsicElements {
    'l-ping': any;
  }
}

export default function Page() {

  return (
    <div className=''>

    </div>
  );
}

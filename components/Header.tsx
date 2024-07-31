import React from 'react'
import { headerProps, signInProps } from '@/types/types';
import { PiSignOutFill } from "react-icons/pi";

export default function Header( { profilePic, userName} : headerProps, { setSignedIn} : signInProps) {
  return (
    <header className='flex flex-row items-center justify-between w-full px-4 py-2 top-0 absolute overflow-hidden bg-orange text-white z-10 shadow-lg'>
        <div className='flex flex-row items-center w-full'>
          <img 
            className='min-w-10 w-10 overflow-hidden rounded-full' 
            src={profilePic} 
            alt="Profile Picture" 
          />
          <h3 className='text-2xl ml-3 truncate'>{userName}</h3>
        </div>
        <button onClick={()=> setSignedIn(false)}>
          <PiSignOutFill size={40} className='transition hover:fill-black'/>
        </button>
    </header>
  )
}
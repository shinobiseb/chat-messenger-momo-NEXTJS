import React from 'react'
import { headerProps, signInProps } from '@/types/types';
import { PiSignOutFill } from "react-icons/pi";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function Header( { profilePic, userName} : headerProps, { setSignedIn} : signInProps) {
  return (
    <header className='flex flex-row items-center justify-between w-full px-1 py-2 top-0 absolute overflow-hidden bg-orange text-white z-10 shadow-lg'>
        <div className='flex flex-row items-center w-full'>
        <button className=''><IoArrowBackCircleOutline size={30}/></button>
          <img 
            className='min-w-10 w-10 overflow-hidden rounded-full' 
            src={profilePic} 
            alt="Profile Picture" 
          />
          <h3 className='text-2xl ml-3 truncate'>{userName}</h3>
        </div>
        <button>
          <PiSignOutFill size={40} className='transition hover:fill-black'/>
        </button>
    </header>
  )
}
import React from 'react'
import { headerProps } from '@/types/types';
import { FiMenu } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from 'next/navigation';

export default function Header( { profilePic, recipient } : headerProps) {
  
  return (
    <header className='flex flex-row items-center justify-between w-full px-1 py-2 top-0 overflow-hidden bg-gray text-black shadow-lg'>
        <div className='flex flex-row items-center w-full'>
        <button 
        className='px-1 cursor-pointer hover:fill-yellow'><IoChevronBack size={30} /></button>
          <h3 className='text-2xl ml-3 truncate'>{recipient}</h3>
        </div>
        <button>
          <FiMenu 
          size={27} 
          className='transition hover:fill-black mr-2'
          />
        </button>
    </header>
  )
}
import React from 'react'
import { headerProps } from '@/types/types';
import { FiMenu } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import useCookie from '@/lib/useCookie';

export default function Header( { profilePic, userName } : headerProps) {
  const router = useRouter()
  const { getUserNameFromCookies } = useCookie()
  const currentUserName = getUserNameFromCookies()

  console.log('target User is: ', userName)
  
  return (
    <header className='flex flex-row items-center justify-between w-full px-1 py-2 top-0 absolute overflow-hidden bg-orange text-white z-10 shadow-lg'>
        <div className='flex flex-row items-center w-full'>
        <button 
        className='px-1 cursor-pointer hover:fill-yellow'
        onClick={()=> router.push(`/chats/${currentUserName}`)}><IoChevronBack size={30} /></button>
          <h3 className='text-2xl ml-3 truncate'>{userName}</h3>
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
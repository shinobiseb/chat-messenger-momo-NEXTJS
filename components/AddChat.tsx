import React from 'react'
import { AddChatProps } from '@/types/types'

export default function AddChat( { setIsOpen }: AddChatProps ) {
  return (
    <div className='w-11/12 h-60 bg-orange rounded-md flex flex-col items-center justify-center self-center m-auto'>
        <h3 className='text-white text-3xl mb-3 font-semibold'>Create a Chat</h3>
        <form className='flex flex-col justify-between items-center  h-1/2 w-full' action="">
            <input className='rounded-md px-2 py-1 w-5/6' type="text" name="" id="" placeholder='User Name'/>
            <input className='rounded-md px-2 py-1 w-5/6' type="text" name="" id="" placeholder='Password'/>
            <input 
            className='bg-white px-2 py-1 rounded-md' 
            type="submit" 
            placeholder='Create' 
            value='Create'
            onClick={()=> setIsOpen(false)}
            />
        </form>
    </div>
  )
}

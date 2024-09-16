import React from 'react'
import 'ldrs/ring'
import { miyagi } from 'ldrs';

miyagi.register()

export default function Loading() {
  return (
    <div className='text-white flex flex-col justify-center items-center'> 
        <l-miyagi
          size="60"
          stroke="5"
          speed="0.7" 
          color="white" 
        ></l-miyagi>
        <span className='text-gray text-sm mt-2'>One sec...</span>
    </div>
  )
}

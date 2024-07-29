import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";

export default function TextBox() {
  const [content, setContent] = useState('')

  const handleChange = ( e: any) => {
    if(e.target){
      setContent(e.target?.value)
      console.log('Content: ' + content)
    }
  }

  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <input
      className='w-5/6 p-3 rounded-lg shadow-lg self-center focus:outline-none my-2'
      placeholder='Type Message...'
      type='text'
      onChange={handleChange}
      >
      </input>
      <button className='p-2' onClick={()=> {
        console.log('Sent: ' + content)
      }}>
        <IoSend size={30} fill='orange'/>
      </button>
    </div>
  )  
}
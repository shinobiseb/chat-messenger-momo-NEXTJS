'use client'

import React, { useState } from 'react';
import { User } from '@/types/types';
import { createUser } from '@/app/api/api';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const SignUpForm = () => {
  const [showError, setShowError] = useState(false);
  const [ loading, setLoading ] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true)

    const formData = new FormData(event.target as HTMLFormElement);
    const userInput = formData.get('userName') as string;
    const passwordInput = formData.get('password') as string;

    if (!userInput || !passwordInput) {
      console.error(
        `Input not found! \n 
        userInput: ${userInput} \n 
        passwordInput: ${passwordInput}`
      );
      return;
    }

    const data: User = {
      email: 'mockemail@email.com',
      userName: userInput,
      password: passwordInput,
      profilePic: '',
      _id: '',
    };

    try {
      const result = await createUser(data);
      console.log(result);
      if (result.error) {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      } else {
        setLoading(false)
        router.back();
      }
    } catch (error) {
      setLoading(false)
      console.error('Error creating user:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  if(loading){
    return (
      <Loading/>
    )
  }

  return (
    <div className="relative max-w-xl bg-orange w-11/12 rounded-xl flex flex-col justify-evenly items-center py-6 drop-shadow-md h-72">
      <h3 className="text-white py-1 text-2xl font-semibold">Create an Account</h3>
      <form 
        className="flex flex-col h-full justify-between" 
        onSubmit={handleSubmit}
      >
        <input
          required
          className="rounded-md p-1 px-2"
          type="text"
          name="userName"
          placeholder="User"
        />
        <input
          required
          className="rounded-md p-1 px-2"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="font-bold rounded-md bg-white p-1 px-2 button-hover"
          type="submit"
          value="Create"
        />
      </form>
      <button onClick={() => router.back()} className="font-bold button-hover rounded-md bg-white py-1 px-4 mt-2">Back</button>
      {showError && (
        <div className="popup-overlay show" onClick={() => setShowError(false)}>
          <div className="popup-content bg-yellow ">
            <p className='text-black'>An error occurred while creating your account.</p>
          </div>
        </div>
      )}
      <span className='text-lightgray italic text-sm py-1'>DISCLAIMER: We're in beta — avoid using everyday passwords</span>
    </div>
  );
}

export default dynamic(()=> Promise.resolve(SignUpForm), { ssr:false })

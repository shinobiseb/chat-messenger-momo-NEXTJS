'use client'

import React, { useState } from 'react';
import { User } from '@/types/types';
import { createUser } from '@/app/api/api';

export default function SignUpForm() {
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);
    const emailInput = formData.get('email') as string;
    const userInput = formData.get('userName') as string;
    const passwordInput = formData.get('password') as string;

    if (!emailInput || !userInput || !passwordInput) {
      console.error(
        `Input not found! \n 
        emailInput: ${emailInput} \n 
        userInput: ${userInput} \n 
        passwordInput: ${passwordInput}`
      );
      return;
    }

    const data: User = {
      email: emailInput,
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
        history.back();
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="relative max-w-xl bg-orange w-11/12 h-72 rounded-xl flex flex-col justify-evenly items-center py-6 drop-shadow-md">
      <h3 className="text-white py-1 text-2xl font-semibold">Create an Account</h3>
      <form 
        className="flex flex-col h-full justify-between" 
        onSubmit={handleSubmit}
      >
        <input
          required
          className="rounded-md p-1 px-2"
          type="email"
          name="email"
          placeholder="Email"
        />
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
      <button onClick={() => history.back()} className="font-bold button-hover rounded-md bg-white py-1 px-4 mt-2">Back</button>
      {showError && (
        <div className="popup-overlay show" onClick={() => setShowError(false)}>
          <div className="popup-content bg-yellow ">
            <p className='text-black'>An error occurred while creating your account.</p>
          </div>
        </div>
      )}
    </div>
  );
}
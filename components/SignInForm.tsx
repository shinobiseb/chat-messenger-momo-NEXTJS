'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useUserState } from '@/lib/UserStateContext';

export default function SignInForm() {
  const { setUserName, setIsSignedIn } = useUserState();
  const [showError, setShowError] = useState(false);

  const { setLoggedInUser } = useLocalStorage('CurrentUser');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const userInput = formData.get('userName') as string;
    const passwordInput = formData.get('password') as string;

    if (!userInput || !passwordInput) {
      console.error(`Input not found! \n userInput: ${userInput} \n passwordInput: ${passwordInput}`);
      return;
    }

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { users } = await response.json();

    const user = users.find((user: { userName: string; password: string; }) => user.userName === userInput && user.password === passwordInput);

    if (user) {
      setLoggedInUser(user.userName);
      setUserName(user.userName);
      setIsSignedIn(true);
      router.push(`/Chats/${user.userName}`);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-orange w-11/12 h-64 rounded-xl p-6 drop-shadow-md">
      <h3 className="text-white py-1 text-2xl font-semibold">Sign In</h3>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          required
          className="rounded-md p-1 px-2 mb-2"
          type="text"
          name="userName"
          placeholder="User Name"
        />
        <input
          required
          className="rounded-md p-1 px-2 mb-2"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input className="rounded-md bg-white p-1 px-2 mb-2" type="submit" value="Log In" />
      </form>
      <button onClick={() => window.history.back()} className="rounded-md bg-white py-1 px-4 mt-2">
        Back
      </button>
      {showError && (
        <div className="popup-overlay show" onClick={() => setShowError(false)}>
          <div className="popup-content bg-yellow ">
            <p className='text-black'>Oops! That User or Password is incorrect!</p>
          </div>
        </div>
      )}
    </div>
  );
}
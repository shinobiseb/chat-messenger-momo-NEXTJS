'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useUserState } from '@/lib/UserStateContext';
import { authenticateUser } from '@/app/api/api';
import useCookie from '@/lib/useCookie';
import Loading from './Loading';
import dynamic from 'next/dynamic';

const SignInForm = () => {
  const { setUserNameFromCookies } = useCookie();
  const { setUserName, setIsSignedIn } = useUserState();
  const [showError, setShowError] = useState(false);
  const { setLoggedInUser } = useLocalStorage('CurrentUser');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(!loading);

    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const userInput = formData.get('userName') as string;
    const passwordInput = formData.get('password') as string;

    if (!userInput || !passwordInput) {
      console.error(`Input not found! \n userInput: ${userInput} \n passwordInput: ${passwordInput}`);
      return;
    }

    const user = await authenticateUser(userInput, passwordInput);

    if (user) {
      setLoggedInUser(user.userName);
      setUserName(user.userName);
      setIsSignedIn(true);
      setUserNameFromCookies(user.userName);
      router.push(`/chats/${user.userName}`);
    } else {
      setLoading(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  if (!loading) {
    return (
      <div className="flex flex-col max-w-xl justify-center items-center bg-orange w-11/12 h-64 rounded-xl p-6 drop-shadow-md">
        <h3 className="text-white py-1 text-2xl font-semibold">Sign In</h3>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            required
            className="rounded-md p-1 px-2 mb-2 w-full"
            type="text"
            name="userName"
            placeholder="User Name"
          />
          <input
            required
            className="rounded-md p-1 px-2 mb-2 w-full"
            type="password"
            name="password"
            placeholder="Password"
          />
          <input 
            className="button-hover font-bold rounded-md bg-white p-1 mb-2" 
            type="submit" 
            value="Log In" 
          />
        </form>
        <button onClick={() => window.history.back()} className="button-hover font-bold rounded-md bg-white py-1 px-4">
          Back
        </button>
        {showError && (
          <div className="popup-overlay show" onClick={() => setShowError(false)}>
            <div className="popup-content bg-yellow">
              <p className="text-black">Oops! That User or Password is incorrect!</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Loading />
    </div>
  );
};

export default dynamic(() => Promise.resolve(SignInForm), { ssr: false });
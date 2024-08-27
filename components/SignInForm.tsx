'use client'

import React, { useState } from 'react';
import { User } from '@/types/types';
import userState from '@/lib/userState';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
    const { setIsSignedIn, setUserName } = userState();
    const [showError, setShowError] = useState(false);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

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

        let loggedInUser = {
            userName: userInput,
            password: passwordInput,
        };

        const response = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        const users = result.users;

        const user = users.find((user: User) => user.userName === loggedInUser.userName && user.password === loggedInUser.password);

        if (user) {
          console.log('User data:', user); // Check the user object
          setIsSignedIn(true);
          setUserName(user.userName);
          router.push('/Chats')
        } else {
            console.error('User not found');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000); // Hide after 3 seconds
        }
    };

    return (
        <div className="relative bg-orange w-11/12 h-64 rounded-xl flex flex-col justify-evenly items-center py-6 drop-shadow-md">
            <h3 className="text-white py-1 text-2xl font-semibold">Sign In</h3>
            <form 
                className="flex flex-col h-full justify-between" 
                onSubmit={handleSubmit}
            >
                <input
                    required
                    className="rounded-md p-1 px-2"
                    type="text"
                    name="userName"
                    placeholder="User Name"
                />
                <input
                    required
                    className="rounded-md p-1 px-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <input
                    className="rounded-md bg-white p-1 px-2"
                    type="submit"
                    value="Log In"
                />
            </form>

            <button onClick={() => history.back()} className="rounded-md bg-white py-1 px-4 mt-2">Back</button>

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

"use client"

import { User } from "@/types/types";

export default function SignUpForm() {

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const emailInput = formData.get('email') as string
    const userInput = formData.get('userName') as string
    const passwordInput = formData.get('password') as string

    if (!emailInput || !userInput || !passwordInput) {
      console.error(
        `Input not found! \n 
        emailInput: ${emailInput} \n 
        userInput: ${userInput} \n 
        passwordInput: ${passwordInput}`
      );
      return;
    }

    let data : User = {
      email: emailInput,
      userName: userInput,
      password: passwordInput,
      profilePic: '',
      _id: '',
    };

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    history.back()

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="relative bg-orange w-11/12 h-72 rounded-xl flex flex-col justify-evenly items-center py-6 drop-shadow-md">
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
          placeholder="email"
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
          className="rounded-md bg-white p-1 px-2"
          type="submit"
          value="Create"
        />
      </form>
      <button onClick={()=> history.back()} className="rounded-md bg-white py-1 px-4 mt-2">Back</button>
    </div>
  );
}

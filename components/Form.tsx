import { signInProps } from '@/types/types';

export default function Form({ setSignedIn, signInState }: signInProps) {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
    };

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="bg-orange w-11/12 h-60 rounded-xl flex flex-col justify-around items-center py-12 drop-shadow-md">
      <form className="flex flex-col h-full justify-between" onSubmit={handleSubmit}>
        <input
          required
          className="rounded-md p-1"
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          required
          className="rounded-md p-1"
          type="text"
          name="username"
          placeholder="User"
        />
        <input
          required
          className="rounded-md p-1"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="rounded-md bg-white p-1"
          type="submit"
          value="Create"
        />
      </form>
    </div>
  );
}

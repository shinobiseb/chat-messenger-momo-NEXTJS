import { User } from '@/types/types';
import { Chat } from '@/types/types';

//Authenticate User
export async function authenticateUser(userName: string, password: string): Promise<{ userName: string } | null> {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const { users } = await response.json();
      const user = users.find((user: { userName: string; password: string; }) => user.userName === userName && user.password === password);
      
      return user || null;
    } catch (error) {
      console.error(`Error authenticating user: ${error}`);
      return null;
    }
  }

//Create User
export async function createUser(userData: User): Promise<any> {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error('Network response was not ok');
    
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating user:', error.message);
      return { error: error.message };
    } else {
      console.error('An unexpected error occurred:', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}

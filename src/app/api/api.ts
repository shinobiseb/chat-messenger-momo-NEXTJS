import { User } from '@/types/types';

export async function findUser(targetUserName: string): Promise<boolean>{
  console.log('Looking for: ', targetUserName)
  try {
    const response = await fetch('/api/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const { users } = await response.json();
    const user = users.find(( user: User) => user.userName === targetUserName)
    
    if(!user){
      console.error('User Does Not Exist')
      return false
    } else {
      console.log('User Found! ', targetUserName)
      return true
    }
  } catch (error) {
    console.error(`Error finding User : ${error}`);
    return false;
  }
}

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
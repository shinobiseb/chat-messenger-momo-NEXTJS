import { useState } from 'react';

export default function userState() {
  const [userName, setUserName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  return {
    userName,
    setUserName,
    isSignedIn,
    setIsSignedIn
  };
}

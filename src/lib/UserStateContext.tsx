'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserStateContextType {
  userName: string;
  isSignedIn: boolean;
  setUserName: (userName: string) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

const UserStateContext = createContext<UserStateContextType | undefined>(undefined);

export const UserStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <UserStateContext.Provider value={{ userName, setUserName, isSignedIn, setIsSignedIn }}>
      {children}
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserStateProvider');
  }
  return context;
};

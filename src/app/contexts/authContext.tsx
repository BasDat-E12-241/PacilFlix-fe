"use client";

import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const authState = window.localStorage.getItem('isAuthenticated');
    return authState ? JSON.parse(authState) : false;
  });
  const { push } = useRouter();

  const login = async (username: string, password: string) => {
    // Call your API here
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsAuthenticated(true);
      window.localStorage.setItem('isAuthenticated', 'true');
      alert('Login berhasil');
      push('/daftar-tayangan');
    } else {
      alert(data.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    window.localStorage.setItem('isAuthenticated', 'false');
    push('/');
  };

  useEffect(() => {
    window.localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
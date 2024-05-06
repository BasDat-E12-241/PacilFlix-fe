"use client";

import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  username: string;
  negaraAsal: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [negaraAsal, setNegaraAsal] = useState('');
  const { push } = useRouter();

  const login = async (username: string, password: string) => {
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
      setUsername(data.username);
      setNegaraAsal(data.negara_asal);
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
    <AuthContext.Provider value={{ isAuthenticated, username, negaraAsal, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
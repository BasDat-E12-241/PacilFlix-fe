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

  useEffect(() => {
    const authLocal = window.localStorage.getItem('isAuthenticated');
    const usernameLocal = window.localStorage.getItem('username');
    const negaraAsalLocal = window.localStorage.getItem('negaraAsal');
    if (authLocal) {
      setIsAuthenticated(JSON.parse(authLocal));
    }
    if (usernameLocal) {
      setUsername(usernameLocal);
    }
    if (negaraAsalLocal) {
      setNegaraAsal(negaraAsalLocal);
    }
  }, []);


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
      window.localStorage.setItem('isAuthenticated', 'true');
      window.localStorage.setItem('username', data.username);
      window.localStorage.setItem('negaraAsal', data.negara_asal);
      setIsAuthenticated(true);
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
    setUsername('');
    window.localStorage.setItem('username', '');
    setNegaraAsal('');
    window.localStorage.setItem('negaraAsal', '');
    push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, negaraAsal, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
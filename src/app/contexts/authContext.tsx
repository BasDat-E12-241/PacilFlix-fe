"use client";

import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  username: string;
  negaraAsal: string;
  is_aktif: boolean
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setIs_Aktif: (is_aktif: boolean) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [negaraAsal, setNegaraAsal] = useState('');
  const [is_aktif, setIsAktif] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const authLocal = window.localStorage.getItem('isAuthenticated');
    const usernameLocal = window.localStorage.getItem('username');
    const negaraAsalLocal = window.localStorage.getItem('negaraAsal');
    const aktifLocal = window.localStorage.getItem('is_aktif');
    
    if (authLocal) {
      setIsAuthenticated(JSON.parse(authLocal));
    }
    if (usernameLocal) {
      setUsername(usernameLocal);
    }
    if (negaraAsalLocal) {
      setNegaraAsal(negaraAsalLocal);
    }
    if (aktifLocal) {
      setIsAktif(JSON.parse(aktifLocal));
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
      const aktif = await fetch(`/api/aktif/${username}`);
      const data_aktif = await aktif.json();
      
      if (data_aktif && data_aktif.length > 0) {
        window.localStorage.setItem('is_aktif', 'true');
        setIsAktif(true);
      } else {
        window.localStorage.setItem('is_aktif', 'false');
        setIsAktif(false);
      }
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
    setIsAktif(false);
    window.localStorage.setItem('is_aktif', 'false');

    push('/');
  };

  const setIs_Aktif = (is_aktif: boolean) => {
    window.localStorage.setItem('is_aktif', is_aktif ? 'true' : 'false');
    setIsAktif(is_aktif);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, negaraAsal, login, logout, is_aktif, setIs_Aktif }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
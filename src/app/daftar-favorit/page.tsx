"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import { useAuth } from '@/app/contexts/authContext';

interface Favorite {
  id: number;
  judul: string;
  waktu: string;
}

export default function DaftarFavorit() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState<Favorite[]>([]);

  const { username } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (username) {
        const response = await fetch(`/api/favorites?username=${username}`);
        if (response.ok) {
          const data: Favorite[] = await response.json();
          setFavorites(data);
          setFilteredFavorites(data);
        } else {
          console.error('Failed to fetch favorites');
        }
      }
    }
    fetchData();
  }, [username]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filtered = favorites.filter(favorite =>
        favorite.judul.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFavorites(filtered);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, favorites]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    const newFavorites = favorites.filter(favorite => favorite.id !== id);
    setFavorites(newFavorites);
    setFilteredFavorites(newFavorites);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24">
        <h1 className="text-center text-4xl my-8">Daftar Favorit {username}</h1>
        <div className='flex justify-center my-4'>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 shadow rounded border-0 text-black bg-white"
            style={{ width: '300px' }}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Waktu Ditambahkan</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredFavorites.length > 0 ? filteredFavorites.map((favorite) => (
                
                <tr key={favorite.id} className="border-b">
                  <td className="px-4 py-2">{favorite.judul}</td>
                  <td className="px-4 py-2">{favorite.waktu}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(favorite.id)}
                        className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded focus:outline-none"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              )) : <tr><td colSpan={3} className="text-center py-4">Tidak ada item yang ditemukan</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

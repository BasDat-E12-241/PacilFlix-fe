"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import { useAuth } from '@/app/contexts/authContext';

type Favorite = {
  id_tayangan: string;
  judul: string;
  timestamp: string;
}

export default function DaftarFavorit() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState<Favorite[]>([]);

  const { username } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/daftar-favorit/${username}`);
        console.log("Fetching data from API...");
        if (response.ok) {
          const data: Favorite[] = await response.json();
          console.log("Data fetched:", data);
          setFavorites(data);
          setFilteredFavorites(data);
        } else {
          console.error('Failed to fetch favorites', await response.json());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (username) {
      fetchData();
    }
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (judul: string) => {
    try {
      const response = await fetch(`/api/deleteFavorite/?username=${username}&judul=${judul}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newFavorites = favorites.filter(favorite => favorite.judul !== judul);
        setFavorites(newFavorites);
        setFilteredFavorites(newFavorites);
      } else {
        console.error('Failed to delete favorite', await response.json());
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24">
        <h1 className="text-center text-4xl my-8">Daftar Favorit {username}</h1>
        <div className='flex justify-center my-4'>
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
            {filteredFavorites.length > 0 ? filteredFavorites.map((favorite, index) => (
              <tr key={index}>
                <a href={`/daftar-favorit/${favorite.timestamp}/${favorite.judul}`}><td className="px-4 py-2">{favorite.judul}</td></a>
                <td className="px-4 py-2">{new Date(favorite.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDelete(favorite.judul)}
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

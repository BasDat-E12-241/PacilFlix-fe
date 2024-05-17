"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import { useAuth } from '@/app/contexts/authContext';

export default function DaftarFavorit() {
  const [favorites, setFavorites] = useState([
    { judul: 'Judul Favorit 1', waktu: '2024-04-01', id: 1 },
    { judul: 'Judul Favorit 2', waktu: '2024-04-15', id: 2 },
    { judul: 'Judul Favorit 3', waktu: '2024-04-20', id: 3 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  const { username } = useAuth();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setFilteredFavorites(favorites.filter(favorite =>
        favorite.judul.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }, 300); // Delay 300 ms

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, favorites]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
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
          className="p-2 shadow rounded border-0 text-black bg-white"  // Tambahkan kelas untuk warna teks dan latar
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
                  <td className="flex justify-center">{favorite.judul}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      {favorite.waktu}
                    </div>
                  </td>
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

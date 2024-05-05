"use client";
import React, { useState } from 'react';
import Navbar from '../navbar';

const favorites = [
  { judul: 'Judul Favorit 1', waktu: '2024-04-01', id: 1 },
  { judul: 'Judul Favorit 2', waktu: '2024-04-15', id: 2 },
  { judul: 'Judul Favorit 3', waktu: '2024-04-20', id: 3 },
];

export default function DaftarFavorit() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    // Logik untuk menghapus item dari daftar
    console.log("Hapus item dengan ID:", id);
  };

  const filteredFavorites = favorites.filter(favorite =>
    favorite.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24"> 
        <h1 className="text-center text-4xl my-8">Daftar Favorit</h1>
        <div className='flex justify-center my-4'>
          <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 shadow rounded border-0"
              style={{ width: '300px' }} 
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Waktu Ditambahkan</th>
                <th className="px-4 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredFavorites.map((download) => (
                <tr key={download.id} className="border-b">
                  <td className="px-4 py-2">{download.judul}</td>
                  <td className="px-4 py-2">{download.waktu}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(download.id)}
                        className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded focus:outline-none"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

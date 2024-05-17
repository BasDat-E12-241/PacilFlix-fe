"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import { useAuth } from '@/app/contexts/authContext';

export default function DaftarUnduhan() {
  const [downloads, setDownloads] = useState([
    { judul: 'The Walking Dead', waktu: '2024-04-30', id: 1 },
    { judul: 'Siksa Kubur', waktu: '2024-04-29', id: 2 },
    { judul: 'The Adam Project', waktu: '2024-04-28', id: 3 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDownloads, setFilteredDownloads] = useState(downloads);  // Tanda perubahan: Nama variabel disesuaikan

  const { username } = useAuth();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setFilteredDownloads(downloads.filter(download =>
        download.judul.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }, 300); // Delay 300 ms

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, downloads]);  // Tanda perubahan: Efisiensi dalam filter dan debounce
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Tanda perubahan: Menangani perubahan search
  };

  const handleDelete = (id) => {
    const newDownloads = downloads.filter(download => download.id !== id); // Tanda perubahan: Update state dengan cara yang benar
    setDownloads(newDownloads);
    setFilteredDownloads(newDownloads); // Pastikan filtered list juga diperbarui
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24">
        <h1 className="text-center text-4xl my-8">Daftar Unduhan {username}</h1>
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
            {filteredDownloads.length > 0 ? filteredDownloads.map((download) => (
              // {filteredDownloads.map((download) => (
                <tr key={download.id} className="border-b">
                  <td className="flex justify-center">{download.judul}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      {download.waktu}
                    </div>
                  </td>
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
              )): <tr><td colSpan={3} className="text-center py-4">Tidak ada item yang ditemukan</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

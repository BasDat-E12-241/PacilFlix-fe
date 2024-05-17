"use client";
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../navbar';
import { useAuth } from '@/app/contexts/authContext';

interface Download {
  id: number;
  judul: string;
  waktu: string;
}

export default function DaftarUnduhan() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDownloads, setFilteredDownloads] = useState<Download[]>([]);

  const { username } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (username) {
        const response = await fetch(`/api/downloads?username=${username}`);
        if (response.ok) {
          const data: Download[] = await response.json();
          setDownloads(data);
          setFilteredDownloads(data);
        } else {
          console.error('Failed to fetch downloads');
        }
      }
    }
    fetchData();
  }, [username]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filtered = downloads.filter(download =>
        download.judul.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDownloads(filtered);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, downloads]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id: number) => {
    const newDownloads = downloads.filter(download => download.id !== id);
    setDownloads(newDownloads);
    setFilteredDownloads(newDownloads);
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
            )) : <tr><td colSpan={3} className="text-center py-4">Tidak ada item yang ditemukan</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

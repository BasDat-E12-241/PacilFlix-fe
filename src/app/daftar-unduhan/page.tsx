"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import { useAuth } from '@/app/contexts/authContext';

type Download = {
  id_tayangan: string;
  judul: string;
  timestamp: string;
}

export default function DaftarUnduhan() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDownloads, setFilteredDownloads] = useState<Download[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { username } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/daftar-unduhan/${username}`);
        console.log("Fetching data from API...");
        if (response.ok) {
          const data: Download[] = await response.json();
          setDownloads(data);
          setFilteredDownloads(data);
        } else {
          console.error('Failed to fetch downloads', await response.json());
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

  const handleDelete = async (id_tayangan: string) => {
    try {
      const response = await fetch(`/api/deleteUnduhan?username=${username}&id_tayangan=${id_tayangan}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newDownloads = downloads.filter(download => download.id_tayangan !== id_tayangan);
        setDownloads(newDownloads);
        setFilteredDownloads(newDownloads);
      } else {
        const errorData = await response.json();
        setModalMessage(errorData.message);
        setShowModal(true);
        console.error('Failed to delete download', errorData);
      }
    } catch (error) {
      setModalMessage('Server error');
      setShowModal(true);
      console.error('Error deleting download:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
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
              {filteredDownloads.length > 0 ? filteredDownloads.map((download, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{download.judul}</td>
                  <td className="px-4 py-2">{new Date(download.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(download.id_tayangan)}
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Gagal Menghapus Tayangan Dari Daftar Unduhan</h2>
            <p className="mb-4">Tayangan minimal harus berada di daftar unduhan selama 1 hari agar bisa dihapus.</p>
            <button
              onClick={closeModal}
              className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded focus:outline-none"
            >
              Tutup Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
}

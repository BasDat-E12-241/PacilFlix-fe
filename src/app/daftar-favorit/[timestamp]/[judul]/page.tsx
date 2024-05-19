"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/contexts/authContext';

type Favorite = {
  id_tayangan: string;
  judul: string;
  timestamp: string;
}

export default function DaftarFavorit({ params }: { params: { timestamp: string, judul: string } }) {
  const timestamp = params.timestamp;
  const { username } = useAuth();

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/detail-favorit?username=${username}&timestamp=${timestamp}`);
        if (response.ok) {
          const data: Favorite[] = await response.json();
          console.log("Data fetched:", data);
          setFavorites(data);
          setRefetch(false);
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
  }, [username, refetch]);

  const handleDelete = async (id_tayangan: string) => {
    try {
      const response = await fetch(`/api/deleteTayanganFavorite/?username=${username}&timestamp=${timestamp}&id_tayangan=${id_tayangan}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRefetch(true);
      } else {
        console.error('Failed to delete favorite', await response.json());
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  console.log('Favorites:', favorites)

  return (
    <>
      <div className="container mx-auto pt-24">
        <h1 className="text-center text-4xl my-8">{params.judul}</h1>
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
            {favorites.length > 0 ? favorites.map((favorite, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{favorite.judul}</td>
                <td className="px-4 py-2">{new Date(favorite.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDelete(favorite.id_tayangan)}
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

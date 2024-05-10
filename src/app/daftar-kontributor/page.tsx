'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';

type Contributor = {
  nama: string;
  kewarganegaraan: string;
  jenis_kelamin: number;
  tipe: string;
}

export default function DaftarKontributor() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchContributors() {
      console.log("filter = ",filter);
      const response = await fetch(`/api/contributors/${(filter)}`);
      const data = await response.json();
      setContributors(data);
    }
    fetchContributors();

  }, [filter])
  

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24"> 
        <h1 className="text-center text-4xl my-8">Daftar Kontributor</h1>
        <div className='flex justify-center my-4'>
          <select
            onChange={handleFilterChange}
            value={filter}
            className="p-2 shadow rounded border-0 bg-gray-600"
            style={{ width: '200px' }}
          >
            <option value="all">All</option>
            <option value="pemain">Pemain</option>
            <option value="sutradara">Sutradara</option>
            <option value="penulis_skenario">Penulis Skenario</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">tipe</th>
                <th className="px-4 py-2">Jenis Kelamin</th>
                <th className="px-4 py-2">Kewarganegaraan</th>
              </tr>
            </thead>
            <tbody>
              {contributors.map((contributor, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{contributor.nama}</td>
                  <td className="px-4 py-2">{contributor.tipe }</td>
                  <td className="px-4 py-2">{contributor.jenis_kelamin == 0 ? "laki-laki" : "perempuan" }</td>
                  <td className="px-4 py-2">{contributor.kewarganegaraan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

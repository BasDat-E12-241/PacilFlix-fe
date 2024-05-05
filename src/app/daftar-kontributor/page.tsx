"use client";

import React, { useState } from 'react';
import Navbar from '../navbar';


const contributors = [
  { nama: 'John Doe', tipe: 'Sutradara', jenisKelamin: 'Laki-laki', kewarganegaraan: 'Indonesia' },
  { nama: 'Jane Smith', tipe: 'pemain', jenisKelamin: 'Perempuan', kewarganegaraan: 'US' },
  { nama: 'Juan Perez', tipe: 'penulis skenario', jenisKelamin: 'Laki-laki', kewarganegaraan: 'Spain' }
];

export default function DaftarKontributor() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContributors = contributors.filter(contributor =>
    contributor.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contributor.tipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contributor.jenisKelamin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contributor.kewarganegaraan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24"> 
        <h1 className="text-center text-4xl my-8">Daftar Kontributor</h1>
        <div className='flex justify-center my-4'>
          <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 shadow rounded border-0 "
              style={{ width: '300px' }} 
          />

        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Tipe</th>
                <th className="px-4 py-2">Jenis Kelamin</th>
                <th className="px-4 py-2">Kewarganegaraan</th>
              </tr>
            </thead>
            <tbody>
              {contributors.map((contributor, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{contributor.nama}</td>
                  <td className="px-4 py-2">{contributor.tipe}</td>
                  <td className="px-4 py-2">{contributor.jenisKelamin}</td>
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

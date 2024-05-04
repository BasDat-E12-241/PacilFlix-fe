'use client'

import React, { useState } from "react";

// Dummy data for the trailer
const trailers_global = [
  {
    peringkat: 1,
    judul: "Judul Trailer 1 Global",
    sinopsis: "Sinopsis Trailer 1",
    url: "https://www.youtube.com/watch?v=video1",
    tanggalRilis: "01/01/2022",
    totalView: 10000,
  },
  {
    peringkat: 2,
    judul: "Judul Trailer 2 Global",
    sinopsis: "Sinopsis Trailer 2 Global",
    url: "https://www.youtube.com/watch?v=video2",
    tanggalRilis: "02/01/2022",
    totalView: 15000,
  },
  // Tambahkan trailer lain di sini
];

const trailers_country = [
  {
    peringkat: 1,
    judul: "Judul Trailer 1 Country",
    sinopsis: "Sinopsis Trailer 1 Country",
    url: "https://www.youtube.com/watch?v=video1",
    tanggalRilis: "01/01/2022",
    totalView: 10000,
  },
  {
    peringkat: 2,
    judul: "Judul Trailer 2 Country",
    sinopsis: "Sinopsis Trailer 2 Country",
    url: "https://www.youtube.com/watch?v=video2",
    tanggalRilis: "02/01/2022",
    totalView: 15000,
  },
  // Tambahkan trailer lain di sini
];

const filmTrailers = [
  {
    peringkat: 1,
    judul: "Film Trailer 1",
    sinopsis: "Sinopsis Film Trailer 1",
    url: "https://www.youtube.com/watch?v=film1",
    tanggalRilis: "01/01/2022",
  },
  {
    peringkat: 2,
    judul: "Film Trailer 2",
    sinopsis: "Sinopsis Film Trailer 2",
    url: "https://www.youtube.com/watch?v=film2",
    tanggalRilis: "02/01/2022",
  },
  // Tambahkan trailer film lain di sini
];

const seriesTrailers = [
  {
    peringkat: 1,
    judul: "Series Trailer 1",
    sinopsis: "Sinopsis Series Trailer 1",
    url: "https://www.youtube.com/watch?v=series1",
    tanggalRilis: "01/01/2022",
  },
  {
    peringkat: 2,
    judul: "Series Trailer 2",
    sinopsis: "Sinopsis Series Trailer 2",
    url: "https://www.youtube.com/watch?v=series2",
    tanggalRilis: "02/01/2022",
  },
  // Tambahkan trailer series lain di sini
];

export default function Trailer() {
  const [isActive, setIsActive] = useState(true);
  const [country, setCountry] = useState("Indonesia");
  
  const handleGlobalButtonClick = () => {
    setIsActive(true);
  };
  
  const handleCountryButtonClick = () => {
    setIsActive(false);
  };
  return (

    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8 mt-16">
      <h1 className="text-2xl font-semibold">Trailer</h1>
      <form className="flex flex-col items-center gap-6">
        <label className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Search"
            required
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-164 bg-white text-black focus:border-red-primary"
          />
        </label>
      </form>
      <div className="max-w-3xl w-full p-4 rounded-lg shadow-md">
        <section>
          <h2 className="text-lg font-bold my-4">10 Tayangan Terbaik Minggu Ini</h2>
          <div className="flex mt-4">
            <div
              className={`rounded-full border-2 border-red-primary mr-4 flex justify-center items-center p-1 w-56 ${isActive ? "bg-red-primary" : "border-red-primary"}`}
              onClick={handleGlobalButtonClick}
            >
              <span className="text-white text-base">Opsi Top 10 Global</span>
            </div>
            <div
              className={`rounded-full border-2 border-red-primary flex justify-center items-center p-1 w-56 ${isActive ? "border-red-primary" : "bg-red-primary"}`}
              onClick={handleCountryButtonClick}
            >
              <span className="text-white text-base">Opsi Top 10 {country}</span>
            </div>
          </div>
          <table className="w-full my-4 text-left border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Peringkat</th>
                <th className="border border-gray-300 px-4 py-2">Judul</th>
                <th className="border border-gray-300 px-4 py-2">Sinopsis Trailer</th>
                <th className="border border-gray-300 px-4 py-2">URL Trailer</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal Rilis Trailer</th>
                <th className="border border-gray-300 px-4 py-2">Total view 7 hari terakhir</th>
              </tr>
            </thead>
            <tbody>
              {isActive
                ? trailers_global.map((trailer, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 text-center px-4 py-2">{trailer.peringkat}</td>
                    <td className="border border-gray-300 px-4 py-2">{trailer.judul}</td>
                    <td className="border border-gray-300 px-4 py-2">{trailer.sinopsis}</td>
                    <td className="border border-gray-300 px-4 py-2"><a href={trailer.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Trailer</a></td>
                    <td className="border border-gray-300 px-4 py-2">{trailer.tanggalRilis}</td>
                    <td className="border border-gray-300 text-center px-4 py-2">{trailer.totalView}</td>
                  </tr>
                ))
                : trailers_country.map((trailer, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 text-center px-4 py-2">{trailer.peringkat}</td>
                    <td className="border border-gray-300 px-4 py-2">{trailer.judul}</td>
                    <td className="border border-gray-300 px-4 py-2">{trailer.sinopsis}</td>
                    <td className="border border-gray-300 px-4 py-2"><a href={trailer.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Trailer</a></td>
                    <td className="border border-gray-300 px-4 py-2">{trailer.tanggalRilis}</td>
                    <td className="border border-gray-300 text-center px-4 py-2">{trailer.totalView}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>
  
        <section>
          <h2 className="text-lg font-bold my-4">Film</h2>
          <table className="w-full my-4 text-left border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Judul</th>
                <th className="border border-gray-300 px-4 py-2">Sinopsis Trailer</th>
                <th className="border border-gray-300 px-4 py-2">URL Trailer</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal Rilis Trailer</th>
              </tr>
            </thead>
            <tbody>
              {filmTrailers.map((trailer, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{trailer.judul}</td>
                  <td className="border border-gray-300 px-4 py-2">{trailer.sinopsis}</td>
                  <td className="border border-gray-300 px-4 py-2"><a href={trailer.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Trailer</a></td>
                  <td className="border border-gray-300 px-4 py-2">{trailer.tanggalRilis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
  
        <section>
          <h2 className="text-lg font-bold my-4">Series</h2>
          <table className="w-full my-4 text-left border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Judul</th>
                <th className="border border-gray-300 px-4 py-2">Sinopsis Trailer</th>
                <th className="border border-gray-300 px-4 py-2">URL Trailer</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal Rilis Trailer</th>
              </tr>
            </thead>
            <tbody>
              {seriesTrailers.map((trailer, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{trailer.judul}</td>
                  <td className="border border-gray-300 px-4 py-2">{trailer.sinopsis}</td>
                  <td className="border border-gray-300 px-4 py-2"><a href={trailer.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Trailer</a></td>
                  <td className="border border-gray-300 px-4 py-2">{trailer.tanggalRilis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </section>
  );
}
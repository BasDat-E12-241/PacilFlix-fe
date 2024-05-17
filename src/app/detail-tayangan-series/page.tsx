'use client'

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';



// Dummy data for the Tayangan
const seriesTayangan = [
  {
    peringkat: 1,
    judul: "Series Tayangan 1",
    url: "https://www.youtube.com/watch?v=series1",
    tanggalRilis: "01/01/2022",
    totalViews: "4000",
    durasi: "1 Jam 40 Menit",
    rating: "10.2",
    negara: "Jerman",
    sinopsis: "Lorem ipsum dolor sit amet consectetur. Imperdiet risus imperdiet sit sed lectus nisl congue at. Id imperdiet nibh eget magna augue pellentesque fringilla amet.",
    genre: [
      "romance", "Slice of life", "comedy"
    ],
    pemain: [
      "Pemain 1", "Pemain 2", "Pemain 3"
    ],
    penulis: [
      "penulis 1", "penulis 2", "penulis 3"
    ],
    sutradara: [
      "sutradara 1", "sutradara 2"
    ]

  }
];

const Ulasan = [
  {
    username: "username 1",
    deskripsi: "Lorem ipsum dolor sit amet consectetur. Imperdiet risus imperdiet sit sed lectus nisl congue at. Id imperdiet nibh eget magna augue pellentesque fringilla amet.",
    rating: "9"
  },
  {
    username: "username 2",
    deskripsi: "Lorem ipsum dolor sit amet consectetur. Imperdiet risus imperdiet sit sed lectus nisl congue at. Id imperdiet nibh eget magna augue pellentesque fringilla amet.",
    rating: "4"
  },
  {
    username: "username 3",
    deskripsi: "Lorem ipsum dolor sit amet consectetur. Imperdiet risus imperdiet sit sed lectus nisl congue at. Id imperdiet nibh eget magna augue pellentesque fringilla amet.",
    rating: "7"
  }
];

function DetailEpisodeLink({ href, isActive, children }) {
  return (
    <div className={`${isActive ? "active" : ""}`}>
      <a
        className={`transition-all px-3 py-1 rounded-full ${isActive ? "bg-red-primary text-white" : "text-white"} `}
        style={{ borderRadius: "0.75rem", marginRight: "0.5rem", backgroundColor: "#DC2626", display: "flex", justifyContent: "center", padding: "0.5rem 1rem", width: "9rem", boxSizing: "border-box", textDecoration: "none", fontWeight: "600" }}
        href={href}
      >
        {children}
      </a>
    </div>
  );
}


export default function DetailsSeries() {
  const pathname = usePathname();
  const [rating, setRating] = useState(0); // State untuk menyimpan rating yang dipilih
  const [showModalFavorit, setShowModalFavorit] = useState(false); // Set nilai boolean dari modalfavorit
  const [showModalUnduhan, setShowModalUnduhan] = useState(false); // Set nilai boolean dari modalUnduhan
  // Fungsi untuk menetapkan rating saat bintang diklik
  const handleRatingClick = (index: number) => {
    setRating(index + 1);
  };

  const UlasanCard = ({ username, deskripsi, rating }: { username: string, deskripsi: string, rating: string }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-[790px]">
        <h2 className="text-xl text-red-primary font-semibold mb-2">{username}</h2>
        <p className="text-gray-600 mb-4">{deskripsi}</p>
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Rating:</p>
          {[...Array(parseInt(rating))].map((_, index) => (
            <AiFillStar key={index} color="red" size={24} />
          ))}
          {[...Array(10 - parseInt(rating))].map((_, index) => (
            <AiOutlineStar key={index} color="red" size={24} />
          ))}
        </div>
      </div>
    );
  };

  
  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4 mt-16">
      <h1 className="text-2xl font-semibold mt-10">Halaman Series</h1>
      <h3 className="text-lg font-reguler">Judul</h3>
      <h1 className="text-2xl font-semibold">{seriesTayangan[0].judul}</h1>
      <div className="flex mt-4">
        <div
          className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-40 hover:cursor-pointer`}
        >
        <div
        onClick={()=> setShowModalUnduhan(true)}
        className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-40 hover:cursor-pointer`}
        >
        <span className="text-white text-base">Unduh</span>
        </div>
        </div>
          <div className={`fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center transition-all ${showModalUnduhan ? "scale-100" : "scale-0"}`}>
          <div onClick={()=> setShowModalUnduhan(false)} className={`fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center transition-all ${showModalFavorit ? "scale-100" : "scale-0"}`}> 
          </div>
            <div className="bg-gray-800 p-5 rounded-lg shadow-2xl text-center">
              <h2 className="text-lg font-bold text-green-500 mb-4">SUKSES MENAMBAHKAN TAYANGAN KE DAFTAR UNDUHAN!</h2>
              
              {/* Kotak/Card untuk teks dan tombol */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-white">Selamat! Anda telah berhasil mengunduh [Judul Tayangan] dan akan berlaku hingga [current time + 7 hari]. Cek informasi selengkapnya pada halaman daftar unduhan.</p>
                <button onClick={()=> setShowModalUnduhan(false)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 focus:outline-none">Menuju Daftar Unduhan</button>
              </div>
            </div>
          </div>
        <div
          onClick={()=> setShowModalFavorit(true)}
          className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-40 hover:cursor-pointer`}
        >
        <span className="text-white text-base">Favorit</span>
        </div>
        <div className={`fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center transition-all ${showModalFavorit ? "scale-100" : "scale-0"}`}>
          <div onClick={()=> setShowModalFavorit(false)} className={`fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center transition-all ${showModalFavorit ? "scale-100" : "scale-0"}`}> 
          </div>
          <div className="bg-primary z-10">
            <div className="bg-black-800 p-5 rounded-lg shadow-2xl text-center">
              <h2 className="text-lg font-bold text-white mb-4">Tambah Ke Daftar Favorit</h2>
              <label htmlFor="favorite-dropdown" className="block text-sm font-medium text-gray-200">Judul Daftar Favorit</label>
              <div className="mt-1 relative">
                <select id="favorite-dropdown" className="block w-full pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-gray-700 text-white">
                  <option>Pilih Favorit</option>
                  Favorit
                </select>
              </div>
              <button onClick={()=> setShowModalFavorit(false)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 focus:outline-none">Tambah</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 mt-[80px]">
        <DetailEpisodeLink href="/detail-tayangan-episode" isActive={pathname === "/detail-tayangan-episode"}>
          Episode 1
        </DetailEpisodeLink>
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 2
          </span>
        </div>
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 3
          </span>
        </div>
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 4
          </span>
        </div>
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 5
          </span>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 6
          </span>
        </div>
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 7
          </span>
        </div>
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 8
          </span>
        </div>
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 9
          </span>
        </div>
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 10
          </span>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 11
          </span>
        </div>
        <div className="rounded-xl mr-4 bg-red-primary flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 12
          </span>
        </div>
      </div>
      <div className="flex mt-4 mt-[80px]">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Total Views</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {seriesTayangan[0].totalViews}
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Durasi Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {seriesTayangan[0].durasi}
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">URL Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {seriesTayangan[0].url.length > 20 ? seriesTayangan[0].url.substring(0, 20) + "..." : seriesTayangan[0].url}
          </div>
        </label>
      </div>
      <div className="flex mt-4">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Rating Rata-Rata</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {seriesTayangan[0].rating}
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Tanggal Rilis Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {seriesTayangan[0].tanggalRilis}
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">Asal Negara</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {seriesTayangan[0].negara}
          </div>
        </label>
      </div>
      <div className="flex mt-4">
        <label className="flex flex-col">
          <span className="font-semibold mb-2">Sinopsis</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[790px] bg-white text-black focus:border-red-primary overflow-hidden">
            {seriesTayangan[0].sinopsis}
          </div>
        </label>
      </div>
      <div className="flex mt-4 mb-20">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Genre</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {seriesTayangan[0].genre.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Pemain</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {seriesTayangan[0].pemain.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        </label>

        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Penulis Skenario</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {seriesTayangan[0].penulis.map((writer, index) => (
                <li key={index}>{writer}</li>
              ))}
            </ul>
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-semibold">Sutradara</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {seriesTayangan[0].sutradara.map((director, index) => (
                <li key={index}>{director}</li>
              ))}
            </ul>
          </div>
        </label>
      </div>
      <h1 className="text-2xl font-semibold mt-10">Bagian Ulasan</h1>
      {/* Render 10 bintang secara horizontal */}
      <div style={{ display: 'flex' }}>
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleRatingClick(index)}
            style={{ cursor: 'pointer' }}
          >
            {index < rating ? (
              <AiFillStar color="red" size={34} />
            ) : (
              <AiOutlineStar color="red" size={34} />
            )}
          </span>
        ))}
      </div>
      <label className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Ulasan"
          required
          className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[380px] bg-white text-black focus:border-red-primary"
        />
      </label>
      <button type="submit" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-red-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold">
        Submit
      </button>
      <div className="flex mt-4">
        <div>
          {Ulasan.map((ulasan, index) => (
            <UlasanCard
              key={index}
              username={ulasan.username}
              deskripsi={ulasan.deskripsi}
              rating={ulasan.rating}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
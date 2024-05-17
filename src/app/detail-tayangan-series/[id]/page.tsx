'use client'

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


type SeriesTayangan = {
  judul: string;
  url: string;
  tanggalRilis: string;
  totalViews: number;
  durasi: number;
  rating: number;
  negara: string;
  sinopsis: string;
  genre: string[];
  pemain: string[];
  penulis: string[];
  sutradara: string[];
  jumlahEpisode: number;
};

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


export default function DetailsSeries({ params }: { params: { id: string } }) {
  const pathname = usePathname();
  const [rating, setRating] = useState(0); 
  const [filmData, setFilmData] = useState<SeriesTayangan>(); 

  const idTayangan = params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("ini idnya", idTayangan);
        const response = await fetch(`/api/detail-tayangan/series/${idTayangan}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        const data = await response.json();

        const adaptedData: SeriesTayangan = {
          judul: data[0].judul,
          url: data[0].url_video,
          tanggalRilis: data[0].release_date,
          totalViews: data[0].total_views,
          durasi: data[0].total_durasi, 
          rating: 0, 
          negara: data[0].asal_negara,
          sinopsis: data[0].sinopsis,
          genre: data[0].list_genre.split(", "),
          pemain: data[0].list_pemain.split(", "),
          penulis: data[0].list_penulis_skenario.split(", "),
          sutradara: data[0].nama_sutradara ? data[0].nama_sutradara.split(", ") : null,
          jumlahEpisode: data[0].total_episodes
        };

        setFilmData(adaptedData);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    fetchData();
  }, [idTayangan]);

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
      <h1 className="text-2xl font-semibold">{filmData?.judul}</h1>
      <div className="flex mt-4">
        <div
          className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-40`}
        >
          <span className="text-white text-base">Unduh</span>
        </div>
        <div
          className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-40`}
        >
          <span className="text-white text-base">Favorite</span>
        </div>
      </div>
      <div className="flex mt-4 mt-[80px]">
        {Array.from({ length: filmData?.jumlahEpisode ?? 0 }, (_, index) => (
          <DetailEpisodeLink
            href={`/detail-tayangan-episode/${idTayangan}/${index}`}
            isActive={pathname === `/detail-tayangan-episode`}
          >
            Episode {index + 1}
          </DetailEpisodeLink>
        ))}
      </div>
      <div className="flex mt-4 mt-[80px]">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Total Views</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.totalViews}
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Durasi Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.durasi}
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">URL Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.url && filmData?.url.length > 20 ? filmData?.url.substring(0, 20) + "..." : filmData?.url}
          </div>
        </label>
      </div>
      <div className="flex mt-4">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Rating Rata-Rata</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.rating}
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Tanggal Rilis Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.tanggalRilis}
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">Asal Negara</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.negara}
          </div>
        </label>
      </div>
      <div className="flex mt-4">
        <label className="flex flex-col">
          <span className="font-semibold mb-2">Sinopsis</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[790px] bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.sinopsis}
          </div>
        </label>
      </div>
      <div className="flex mt-4 mb-20">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Genre</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmData?.genre.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Pemain</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmData?.pemain.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        </label>

        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Penulis Skenario</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmData?.penulis.map((writer, index) => (
                <li key={index}>{writer}</li>
              ))}
            </ul>
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-semibold">Sutradara</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmData?.sutradara.map((director, index) => (
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
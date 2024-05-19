'use client'

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type EpisodeTayangan = {
  judul_series: string;
  sub_judul: string;
  url_video: string;
  release_date: string;
  totalViews: string;
  durasi: string;
  rating: string;
  negara: string;
  sinopsis: string;
  genre: string[];
  pemain: string[];
  penulis: string[];
  sutradara: string[];
};

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

export default function DetailsEpisode({ params }: { params: { idTayangan: string, index: number } }) {
  const [filmData, setFilmData] = useState<EpisodeTayangan[]>([]); 
  const pathname = usePathname();

  const idTayangan = params.idTayangan; 
  const index = params.index;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("ini idnya", idTayangan);
        console.log("ini indexnya", index);
        if (idTayangan) {
          const response = await fetch(`/api/detail-tayangan/episode/${idTayangan}`);
          if (!response.ok) {
            throw new Error('Gagal mengambil data dari server');
          }
          const data = await response.json();
          console.log("data episode", data);
          setFilmData(data);
        } else {
          console.log("idTayangan is not available");
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    fetchData();
  }, [idTayangan]);


  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4 mt-16">
      <h1 className="text-2xl font-semibold mt-10">Halaman Series</h1>
      <h3 className="text-lg font-reguler">Judul</h3>
      <h1 className="text-2xl font-semibold">{filmData[index]?.judul_series}</h1>
      <h3 className="text-lg font-reguler">Sub-Judul</h3>
      <h1 className="text-lg font-semibold">{filmData[index]?.sub_judul}</h1>
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
        {Array.from({ length: filmData.length ?? 0 }, (_, index) => (
          <DetailEpisodeLink
            key={index}
            href={`/detail-tayangan-episode/${idTayangan}/${index}`}
            isActive={pathname === `/detail-tayangan-episode/${idTayangan}/${index}`}
          >
            Episode {index + 1}
          </DetailEpisodeLink>
        ))}
      </div>
      <div className="flex mt-4 mt-[80px]">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Tanggal Rilis Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData[index]?.release_date}
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Durasi Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData[index]?.durasi}
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">URL Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData[index]?.url_video?.length && filmData[index]?.url_video?.length > 20 ? filmData[index]?.url_video?.substring(0, 20) + "..." : filmData[index]?.url_video}
          </div>
        </label>
      </div>
      <div className="flex mt-4 mb-16">
        <label className="flex flex-col">
          <span className="font-semibold mb-2">Sinopsis</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[790px] bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData[index]?.sinopsis}
          </div>
        </label>
      </div>
    </section>
  );
}
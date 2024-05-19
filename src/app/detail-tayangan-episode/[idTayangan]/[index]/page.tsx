'use client'

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/authContext";
import { useRouter } from 'next/navigation';

type EpisodeTayangan = {
  judul_series: string;
  sub_judul: string;
  url_video: string;
  release_date: string;
  totalViews: string;
  durasi: number;
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
  const { username } = useAuth();
  const [filmData, setFilmData] = useState<EpisodeTayangan[]>([]); 
  const pathname = usePathname();
  const [sliderValue, setSliderValue] = useState(0);
  const { push } = useRouter();
  const [isReleased, setIsReleased] = useState(false);


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
          
          if (data[index]?.release_date) {
            console.log("Tanggal rilis:", data[index]?.release_date);
            const releaseDate = new Date(data[index]?.release_date);
            console.log("Tanggal rilis:", releaseDate);
            const currentDate = new Date();
            console.log("Tanggal sekarang:", currentDate);
            setIsReleased(currentDate >= releaseDate);
          }
        } else {
          console.log("idTayangan is not available");
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    fetchData();
  }, [idTayangan]);

  const updateSliderValue = (e) => {
    setSliderValue(e.target.value);
  };

  const submitProgress = (durasi : number) => {
    console.log("Durasi film: " + durasi + " menit");
    console.log("Progress: " + sliderValue + "%");
    
    if (sliderValue >= 70) {
      const start_date_time = new Date();
      const watchedDuration = Math.ceil((sliderValue / 100) * durasi); // Durasi yang sudah ditonton dalam menit
      const end_date_time = new Date(start_date_time);
      end_date_time.setMinutes(start_date_time.getMinutes() + watchedDuration);
  
      // Format timestamp without time zone
      const formatTimestamp = (date) => {
        const pad = (num) => (num < 10 ? '0' : '') + num;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      };
  
      const formattedStartDateTime = formatTimestamp(start_date_time);
      const formattedEndDateTime = formatTimestamp(end_date_time);
  
      console.log("Start Date Time: " + formattedStartDateTime);
      console.log("End Date Time: " + formattedEndDateTime);

      fetch('/api/detail-tayangan/film/progress', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id_tayangan: idTayangan,
          username: username,
          start_date_time: formattedStartDateTime,
          end_date_time: formattedEndDateTime
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Progress berhasil disimpan!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menyimpan progress.');
      });

      alert('Progress berhasil disimpan!');
      push('/daftar-tayangan');
    } else {
      alert('Terjadi kesalahan saat menyimpan progress.');
    }

  };


  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4 mt-16">
      <h1 className="text-2xl font-semibold mt-10">Halaman Series</h1>
      <h3 className="text-lg font-reguler">Judul</h3>
      <h1 className="text-2xl font-semibold">{filmData[index]?.judul_series}</h1>
      <h3 className="text-lg font-reguler">Sub-Judul</h3>
      <h1 className="text-lg font-semibold">{filmData[index]?.sub_judul}</h1>
      <div className="flex mt-4">
        {isReleased && <button
          onClick={() => submitProgress(filmData[index]?.durasi || 0)}
          className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-40`}
        >
          <span className="text-white text-base">Tonton</span>
        </button>}
        {!isReleased && <button
          className={`rounded-full border-2 border-red-primary mr-4 flex justify-center items-center p-1 w-40`}
        >
          <span className="text-white text-base">Tonton</span>
        </button>}
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
      <div className="flex mt-4 flex-col items-center">
        <h2 className="text-lg font-reguler mb-4">Progress Menonton Film/Episode</h2>
        <input
          type="range"
          id="progressSlider"
          className="slider"
          min="0"
          max="100"
          value={sliderValue}
          onChange={updateSliderValue}
          style={{ width: '400px', height: '10px', color : 'red'}}
        />
        <p className="text-lg font-reguler mt-4">Progress: <span id="sliderValue">{sliderValue}</span>%</p>
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
'use client'

import { useAuth } from "@/app/contexts/authContext";
import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

type FilmTayangan = {
  judul: string;
  url: string;
  tanggalRilis: string;
  totalViews: number;
  durasi: number;
  negara: string;
  sinopsis: string;
  genre: string[];
  pemain: string[];
  penulis: string[];
  sutradara: string[];
};

type Ulasan = {
  id_tayangan: string;
  username: string;
  timestamp: string;
  rating: number;
  deskripsi: string;
};

export default function DetailsFilm({ params }: { params: { id: string } }) {
  const { username } = useAuth();
  const [rating, setRating] = useState(0); // State untuk menyimpan rating yang dipilih
  const [ulasan, setUlasan] = useState("");
  const [filmData, setFilmData] = useState<FilmTayangan>(); // Menggunakan tipe FilmTayangan atau undefined
  const [ulasanGet, setUlasanGet] = useState<Ulasan[]>([]);
  const [sliderValue, setSliderValue] = useState(0);
  const { push } = useRouter();
  const [rataRataRating, setRataRataRating] = useState(0);
  const idTayangan = params.id; // Menggunakan searchParams.id

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("ini idnya", idTayangan);
        const response = await fetch(`/api/detail-tayangan/film/${idTayangan}`); // Menggunakan searchParams.id
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        const data = await response.json();

        const adaptedData: FilmTayangan = {
          judul: data[0].judul,
          url: data[0].url_video_film,
          tanggalRilis: data[0].release_date_film,
          totalViews: data[0].total_views,
          durasi: data[0].durasi_film,
          negara: data[0].asal_negara,
          sinopsis: data[0].sinopsis,
          genre: data[0].list_genre ? data[0].list_genre.split(", ") : null,
          pemain: data[0].list_pemain ? data[0].list_pemain.split(", ") : null,
          penulis: data[0].list_penulis ? data[0].list_penulis_skenario.split(", ") : null,
          sutradara: data[0].nama_sutradara ? data[0].nama_sutradara.split(", ") : null,
        };

        setFilmData(adaptedData);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    fetchData();
  }, [idTayangan]);

  const handleRatingClick = (index: number) => {
    setRating(index + 1);
  };
  
  const handleRatingSubmit = () => {
    fetch('/api/ulasan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_tayangan: idTayangan,
        username,
        rating,
        deskripsi: ulasan,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert(data.message);
        push('/daftar-tayangan');
      })
      .catch(error => alert(error.message));
  };

  useEffect(() => {
    async function fetchDataUlasan() {
      try {
        console.log("ini idnya", idTayangan);
        if (idTayangan) {
          const response = await fetch(`/api/mendapatkan-ulasan/${idTayangan}`);
          if (!response.ok) {
            throw new Error('Gagal mengambil data dari server');
          }
          const data = await response.json();
          console.log("data ulasan", data);
          setUlasanGet(data);

          // Menghitung rata-rata rating
          if (data.length > 0) {
            const totalRating = data.reduce((total, ulasan) => total + ulasan.rating, 0);
            const averageRating = totalRating / data.length;
            setRataRataRating(averageRating);
          } else {
            setRataRataRating(0);
          }

        } else {
          console.log("idTayangan is not available");
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    fetchDataUlasan();
  }, [idTayangan]);

  const UlasanCard = ({ username, deskripsi, rating }: { username: string, deskripsi: string, rating: number }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-[790px]">
        <h2 className="text-xl text-red-primary font-semibold mb-2">{username}</h2>
        <p className="text-gray-600 mb-4">{deskripsi}</p>
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Rating:</p>
          {[...Array(rating)].map((_, index) => (
            <AiFillStar key={index} color="red" size={24} />
          ))}
          {[...Array(10 - rating)].map((_, index) => (
            <AiOutlineStar key={index} color="red" size={24} />
          ))}
        </div>
      </div>
    );
  };

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
      <h1 className="text-2xl font-semibold mt-10">Halaman Film</h1>
      <h3 className="text-lg font-reguler">Judul</h3>
      <h1 className="text-2xl font-semibold">{filmData?.judul}</h1>
      <div className="flex mt-4">
        <button
          onClick={() => submitProgress(filmData?.durasi || 0)}
          className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-40`}
        >
          <span className="text-white text-base">Tonton</span>
        </button>
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
      <div className="flex mt-4">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Total Views</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.totalViews}
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Durasi Film</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.durasi}
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">URL Film</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmData?.url && filmData?.url.length > 20 ? filmData?.url.substring(0, 20) + "..." : filmData?.url}
          </div>
        </label>
      </div>
      <div className="flex mt-4">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Rating Rata-Rata</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {rataRataRating}
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Tanggal Rilis Film</span>
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
              {filmData?.genre?.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Pemain</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmData?.pemain?.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        </label>

        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Penulis Skenario</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmData?.penulis?.map((writer, index) => (
                <li key={index}>{writer}</li>
              ))}
            </ul>
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-semibold">Sutradara</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmData?.sutradara?.map((director, index) => (
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
      <form className="flex flex-col items-center gap-6" onSubmit={(event) => {
        event.preventDefault();
        handleRatingSubmit();
      }}>
        <label className="flex flex-col gap-2">
          <input
            type="ulasan"
            placeholder="Ulasan"
            required
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary"
            onChange={(event) => setUlasan(event.target.value)}
          />
        </label>
        <button type="submit" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-red-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold items-center">
          Submit
        </button>
      </form>
      <div className="flex mt-4">
        <div>
          {ulasanGet.map((ulasan, index) => (
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
'use client'

import { useAuth } from "@/app/contexts/authContext";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

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

type Ulasan = {
  id_tayangan: string;
  username: string;
  timestamp: string;
  rating: number;
  deskripsi: string;
};

type Favorite = {
  id_tayangan: string;
  judul: string;
  timestamp: string;
}

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
  const router = useRouter();
  const pathname = usePathname();
  const { username, isAuthenticated, negaraAsal } = useAuth();
  const [ulasan, setUlasan] = useState("");
  const [rating, setRating] = useState(0); // State untuk menyimpan rating yang dipilih
  const [showModalFavorit, setShowModalFavorit] = useState(false); // Set nilai boolean dari modalfavorit
  const [showModalUnduhan, setShowModalUnduhan] = useState(false); // Set nilai boolean dari modalUnduhan
  const [filmData, setFilmData] = useState<SeriesTayangan>(); 
  const [unduhMessage, setUnduhMessage] = useState(''); // Menyimpan pesan unduhan
  const [ulasanGet, setUlasanGet] = useState<Ulasan[]>([]);
  const [rataRataRating, setRataRataRating] = useState(0);
  const { push } = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [chosenFavorite, setChosenFavorite] = useState(''); // State untuk menyimpan judul favorit yang dipilih

  const idTayangan = params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/daftar-favorit/${username}`);
        console.log("Fetching data from API...");
        if (response.ok) {
          const data: Favorite[] = await response.json();
          console.log("Data fetched:", data);
          setFavorites(data);
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
  }, [username]);

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
          const sortedData = data.sort((a, b) => {
            const dateA = new Date(a.timestamp).getTime();
            const dateB = new Date(b.timestamp).getTime();
            return dateB - dateA;
          });     
          setUlasanGet(sortedData);

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

  const [nextDate, setNextDate] = useState("");
  useEffect(() => {
    setNextDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString());
  }, [])
  const handleDownload = (id_tayangan: string, username: string) => {
    fetch('/api/addDownload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_tayangan, username }),
    })
      .then(response => response.json())
      .then(data => {
        setShowModalUnduhan(false)
        push('/daftar-unduhan');
      })
      .catch(error => alert(error.message));
  
  };

  const addFavorite = () => {
    if (!chosenFavorite) {
      alert('Please choose a favorite');
      return;
    }
    fetch(`/api/addFavorite/?username=${username}&timestamp=${chosenFavorite}&id_tayangan=${idTayangan}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Berhasil menambahkan ke daftar favorit');
        setShowModalFavorit(false);
        push('/daftar-favorit');
      })
      .catch(error => alert(error.message));
  }

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

  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4 mt-16">
      <h1 className="text-2xl font-semibold mt-10">Halaman Series</h1>
      <h3 className="text-lg font-reguler">Judul</h3>
      <h1 className="text-2xl font-semibold">{filmData?.judul}</h1>
      <div className="flex mt-4">
        <div
          onClick={()=> setShowModalUnduhan(true)}
          className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-40 hover:cursor-pointer`}
        >
          <span className="text-white text-base w-full text-center">Unduh</span>
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
                <select id="favorite-dropdown" className="block w-full pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-gray-700 text-white" onChange={(e) => {setChosenFavorite(e.target.value); console.log(e.target.value)}}>
                  <option key={1} value={''}>Choose a favorite</option>
                  {favorites.map((favorite, index) => (
                    <option key={index} value={favorite.timestamp}>{favorite.judul}</option>
                  ))}
                  Favorit
                </select>
              </div>
              <button onClick={() => addFavorite()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 focus:outline-none">Tambah</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4]">
        {Array.from({ length: filmData?.jumlahEpisode ?? 0 }, (_, index) => (
          <DetailEpisodeLink
            key={index}
            href={`/detail-tayangan-episode/${idTayangan}/${index}`}
            isActive={pathname === `/detail-tayangan-episode`}
          >
            Episode {index + 1}
          </DetailEpisodeLink>
        ))}
      </div>
      <div className="flex mt-4]">
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
          {rataRataRating}
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
        <button type="submit" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-red-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold">
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


      <div className={`fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center transition-all duration-500 ${showModalUnduhan ? "scale-100" : "scale-0"}`}>
          <div onClick={()=> setShowModalUnduhan(false)} className={`fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center transition-all`}></div>
          <div className="bg-gray-800 p-5 z-10 rounded-lg shadow-2xl text-center">
            <h2 className="text-lg font-bold text-green-500 mb-4">SUKSES MENAMBAHKAN TAYANGAN KE DAFTAR UNDUHAN!</h2>
            {/* Kotak/Card untuk teks dan tombol */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-white">Selamat! Anda telah berhasil mengunduh {filmData?.judul} dan akan berlaku hingga { nextDate }. Cek informasi selengkapnya pada halaman daftar unduhan.</p>
              <button onClick={() => handleDownload(idTayangan, username)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none">Lihat Daftar Unduhan</button>
            </div>
          </div>
        </div>
    </section>
  );
}

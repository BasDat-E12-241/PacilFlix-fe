'use client'

import React, {useEffect, useState} from "react";

type Trailer = {
  peringkat: number;
  judul: string;
  sinopsis: string;
  url_video_trailer: string;
  release_date_trailer: string;
  total_view: number;
};

type FilmTrailer = {
  judul: string;
  sinopsis: string;
  url_video_trailer: string;
  release_date_trailer: string;
};

type SeriesTrailer = {
  judul: string;
  sinopsis: string;
  url_video_trailer: string;
  release_date_trailer: string;
};

const fetchGlobalsTrailers = async (search: string = "") => {
  try {
    const response = await fetch(`/api/trailer/global?search=${search}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch global trailers:', error);
    return [];
  }
};

const fetchFilmTrailers = async () => {
  try {
    const response = await fetch(`/api/trailer/film`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch film trailers:', error);
    return [];
  }
};

const fetchSeriesTrailers = async () => {
  try {
    const response = await fetch(`/api/trailer/series`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch series trailers:', error);
    return [];
  }
};

export default function Trailer() {
  const [trailersGlobal, setTrailersGlobal] = useState<Trailer[]>([]);
  const [filmTrailers, setFilmTrailers] = useState<FilmTrailer[]>([]);
  const [seriesTrailers, setSeriesTrailers] = useState<SeriesTrailer[]>([]);
  const [search, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Trailer[]>([]);

  
  useEffect(() => {
    const loadGlobalsTrailers = async () => {
      const data = await fetchGlobalsTrailers();
      setTrailersGlobal(data);
    };

    loadGlobalsTrailers();
  }, []);


  useEffect(() => {
    if (search) {
      const searchTrailers = async () => {
        const data = await fetchGlobalsTrailers(search);
        setSearchResults(data);
      };

      searchTrailers();
    } else {
      setSearchResults([]);
    }
  }, [search]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const loadFilmTrailers = async () => {
      const data = await fetchFilmTrailers();
      setFilmTrailers(data);
    };

    loadFilmTrailers();
  }, []);

  useEffect(() => {
    const loadSeriesTrailers = async () => {
      const data = await fetchSeriesTrailers();
      setSeriesTrailers(data);
    };

    loadSeriesTrailers();
  }, []);

  function getTrailersToDisplay(): Trailer[] {
    return search ? searchResults : trailersGlobal;
  }

  const trailersToDisplay: Trailer[] = getTrailersToDisplay();

  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8 mt-16">
      <h1 className="text-2xl font-semibold">Trailer</h1>
      <form className="flex flex-col items-center gap-6">
        <label className="flex flex-col gap-2">
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-164 bg-white text-black focus:border-red-primary"
          />
        </label>
      </form>
      <div className="max-w-3xl w-full p-4 rounded-lg shadow-md mx-auto flex flex-col items-center">
        <section>
          <h2 className="text-lg font-bold my-4">10 Tayangan Terbaik Minggu Ini</h2>
          <div className="flex mt-4">
            <div
              className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-56`}
            >
              <span className="text-white text-base">Opsi Top 10 Global</span>
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
              {trailersToDisplay?.map((trailer, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 text-center px-4 py-2">{trailer.peringkat}</td>
                    <td className="border border-gray-300 px-4 py-2">{trailer.judul}</td>
                    <td className="border border-gray-300 px-4 py-2">{trailer.sinopsis}</td>
                    <td className="border border-gray-300 px-4 py-2"><a href={trailer.url_video_trailer} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Trailer</a></td>
                    <td className="border border-gray-300 px-4 py-2">{trailer.release_date_trailer}</td>
                    <td className="border border-gray-300 text-center px-4 py-2">{trailer.total_view}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>

        {!search && (
          <>
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
                  {filmTrailers?.map((trailer, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{trailer.judul}</td>
                      <td className="border border-gray-300 px-4 py-2">{trailer.sinopsis}</td>
                      <td className="border border-gray-300 px-4 py-2"><a href={trailer.url_video_trailer} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Trailer</a></td>
                      <td className="border border-gray-300 px-4 py-2">{trailer.release_date_trailer}</td>
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
                  {seriesTrailers?.map((trailer, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{trailer.judul}</td>
                      <td className="border border-gray-300 px-4 py-2">{trailer.sinopsis}</td>
                      <td className="border border-gray-300 px-4 py-2"><a href={trailer.url_video_trailer} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Trailer</a></td>
                      <td className="border border-gray-300 px-4 py-2">{trailer.release_date_trailer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
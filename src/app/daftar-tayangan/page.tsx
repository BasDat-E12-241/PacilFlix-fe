



'use client'

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
function DetailFilmLink({ href, isActive, children }) {
    return (
        <div className={`${isActive ? "active" : ""}`}>
            <a
                className={`transition-all px-3 py-1 rounded-full ${isActive ? "bg-red-primary text-white font-semibold" : "text-white bg-red-primary"} `}
                style={{ borderRadius: "0.75rem", display: "flex", justifyContent: "center", padding: "0.5rem 1rem", width: "6.5rem", boxSizing: "border-box", textDecoration: "none", fontWeight: "600" }}
                href={href}
            >
                {children}
            </a>
        </div>
    );
}

function DetailSeriesLink({ href, isActive, children }) {
    return (
        <div className={`${isActive ? "active" : ""}`}>
            <a
                className={`transition-all px-3 py-1 rounded-full ${isActive ? "bg-red-primary text-white" : "text-white bg-red-primary"} `}
                style={{ borderRadius: "0.75rem", display: "flex", justifyContent: "center", padding: "0.5rem 1rem", width: "6.5rem", boxSizing: "border-box", textDecoration: "none", fontWeight: "600" }}
                href={href}
            >
                {children}
            </a>
        </div>
    );
}

type Trailer = {
    id: string;
    peringkat: number;
    judul: string;
    sinopsis: string;
    url: string;
    release_date_trailer: string;
    total_view: number;
    tipe: string;
};

type FilmTrailer = Trailer;

type SeriesTrailer = Trailer;

const fetchGlobalsTrailers = async (search: string = "") => {
    try {
        console.log('search di fetch: ', search);

        if (!search || search === "") {
            console.log('search kosong');
            const response = await fetch(`/api/tayangan/global`);
            const data = await response.json();
            return data;
        } else {
            console.log('search tidak kosong');
            const response = await fetch(`/api/tayangan/global/${search}`);
            const data = await response.json();
            return data;
        }


    } catch (error) {
        console.error('Failed to fetch global trailers:', error);
        return [];
    }
};

const fetchCountryTrailers = async (negaraAsal: string) => {
    try {
        console.log("ini negaranya", negaraAsal);
        const response = await fetch(`/api/tayangan/country/${negaraAsal}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch global trailers:', error);
        return [];
    }
};


const fetchFilmTrailers = async () => {
    try {
        const response = await fetch(`/api/tayangan/film`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch film trailers:', error);
        return [];
    }
};

const fetchSeriesTrailers = async () => {
    try {
        const response = await fetch(`/api/tayangan/series`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch series trailers:', error);
        return [];
    }
};

export default function Tayangan() {
    const { username, isAuthenticated, negaraAsal } = useAuth();
    const pathname = usePathname();
    const [isActive, setIsActive] = useState(true);
    const [country, setCountry] = useState<string>("");
    const [search, setSearchValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Trailer[]>([]);
    const [trailersGlobal, setTrailersGlobal] = useState<Trailer[]>([]);
    const [filmTrailers, setFilmTrailers] = useState<FilmTrailer[]>([]);
    const [CountryTrailers, setCountryTrailers] = useState<Trailer[]>([]);
    const [seriesTrailers, setSeriesTrailers] = useState<SeriesTrailer[]>([]);

    useEffect(() => {
        const loadGlobalsTrailers = async () => {
            console.log('search: ', search);
            const data = await fetchGlobalsTrailers(search);
            console.log('data: ', data);
            setTrailersGlobal(data);
        };

        loadGlobalsTrailers();
    }, []);

    useEffect(() => {
        if (negaraAsal) {
            const loadCountryTrailers = async () => {
                const data = await fetchCountryTrailers(negaraAsal);
                setCountryTrailers(data);
            };

            loadCountryTrailers();
        }
    }, [negaraAsal]);

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        if (search || search !== "") {
            const loadSearchTrailers = async () => {
                const data = await fetchGlobalsTrailers(search);
                setSearchResults(data);
            };

            loadSearchTrailers();
        }
    }, [search]);

    const handleGlobalButtonClick = () => {
        setIsActive(true);
    };

    trailersGlobal.forEach((trailer, index) => {
        trailer.peringkat = index + 1;
    });

    CountryTrailers.forEach((trailer, index) => {
        trailer.peringkat = index + 1;
    });

    const handleCountryButtonClick = () => {
        setIsActive(false);
    };

    function getTrailersToDisplay(): Trailer[] {
        return search ? searchResults : trailersGlobal;
    }

    const trailersToDisplay: Trailer[] = getTrailersToDisplay();

    return (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8 mt-16">
            <h1 className="text-2xl font-semibold mt-10">Tayangan</h1>
            <form className="flex flex-col items-center gap-6" onSubmit={(e) => e.preventDefault()}>
                <label className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={handleInputChange}
                        placeholder="Search"
                        className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-164 bg-white text-black focus:border-red-primary"
                    />
                </label>
            </form>
            <div className="max-w-3xl w-full p-4 rounded-lg shadow-md mx-auto flex flex-col items-center">
                <section>
                    {!search && <h2 className="text-lg font-bold my-4">10 Tayangan Terbaik Minggu Ini</h2>}
                    {!search && <div className="flex mt-4">
                        <div
                            className={`rounded-full border-2 border-red-500 mr-4 flex justify-center items-center p-1 w-56 ${isActive ? "bg-red-primary" : "border-red-500"}`}
                            onClick={handleGlobalButtonClick}
                        >
                            <span className="text-white text-base">Opsi Top 10 Global</span>
                        </div>
                        <div
                            className={`rounded-full border-2 border-red-500 flex justify-center items-center p-1 w-56 ${isActive ? "border-red-500" : "bg-red-primary"}`}
                            onClick={handleCountryButtonClick}
                        >
                            <span className="text-white text-base">Opsi Top 10 {negaraAsal}</span>
                        </div>
                    </div>}
                    <table className="w-full my-4 text-left border-collapse border border-gray-400">
                        <thead>
                            <tr>
                                {!search && <th className="border border-gray-300 px-4 py-2">Peringkat</th>}
                                <th className="border border-gray-300 px-4 py-2">Judul</th>
                                <th className="border border-gray-300 px-4 py-2">Sinopsis Tayangan</th>
                                <th className="border border-gray-300 px-4 py-2">URL Tayangan</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Rilis Tayangan</th>
                                <th className="border border-gray-300 px-4 py-2">Total view 7 hari terakhir</th>
                                <th className="border border-gray-300 px-4 py-2">Tayangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isActive
                                ? trailersToDisplay.map((Tayangan, index) => (
                                    <tr key={index}>
                                        {!search && <td className="border border-gray-300 text-center px-4 py-2">{Tayangan.peringkat}</td>}
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.judul}</td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.sinopsis}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <a href={Tayangan.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                                                Lihat Tayangan
                                            </a>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.release_date_trailer}</td>
                                        <td className="border border-gray-300 text-center px-4 py-2">{Tayangan.total_view}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {Tayangan.tipe === "Film" ? (
                                                <DetailFilmLink href={`/detail-tayangan-film/${Tayangan.id}`} isActive={pathname === "/detail-tayangan-film"}>
                                                    More
                                                </DetailFilmLink>
                                            ) : (
                                                <DetailSeriesLink href={`/detail-tayangan-series/${Tayangan.id}`} isActive={pathname === "/detail-tayangan-series"}>
                                                    More
                                                </DetailSeriesLink>
                                            )}
                                        </td>
                                    </tr>
                                ))
                                : !search && (CountryTrailers.map((Tayangan, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 text-center px-4 py-2">{Tayangan.peringkat}</td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.judul}</td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.sinopsis}</td>
                                        <td className="border border-gray-300 px-4 py-2"><a href={Tayangan.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Tayangan</a></td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.release_date_trailer}</td>
                                        <td className="border border-gray-300 text-center px-4 py-2">{Tayangan.total_view}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {Tayangan.tipe === "Film" ? (
                                                <DetailFilmLink href={`/detail-tayangan-film/${Tayangan.id}`} isActive={pathname === "/detail-tayangan-film"}>
                                                    More
                                                </DetailFilmLink>
                                            ) : (
                                                <DetailSeriesLink href={`/detail-tayangan-series/${Tayangan.id}`} isActive={pathname === "/detail-tayangan-series"}>
                                                    More
                                                </DetailSeriesLink>
                                            )}
                                        </td>
                                    </tr>
                                )))
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
                                        <th className="border border-gray-300 px-4 py-2">Sinopsis Tayangan</th>
                                        <th className="border border-gray-300 px-4 py-2">URL Tayangan</th>
                                        <th className="border border-gray-300 px-4 py-2">Tanggal Rilis Tayangan</th>
                                        <th className="border border-gray-300 px-4 py-2">Tayangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filmTrailers.map((Tayangan, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">{Tayangan.judul}</td>
                                            <td className="border border-gray-300 px-4 py-2">{Tayangan.sinopsis}</td>
                                            <td className="border border-gray-300 px-4 py-2"><a href={Tayangan.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Tayangan</a></td>
                                            <td className="border border-gray-300 px-4 py-2">{Tayangan.release_date_trailer}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <DetailFilmLink href={`/detail-tayangan-film/${Tayangan.id}`} isActive={pathname === "/detail-tayangan-film"}>
                                                    More
                                                </DetailFilmLink>
                                            </td>
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
                                        <th className="border border-gray-300 px-4 py-2">Sinopsis Tayangan</th>
                                        <th className="border border-gray-300 px-4 py-2">URL Tayangan</th>
                                        <th className="border border-gray-300 px-4 py-2">Tanggal Rilis Tayangan</th>
                                        <th className="border border-gray-300 px-4 py-2">Tayangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seriesTrailers.map((Tayangan, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">{Tayangan.judul}</td>
                                            <td className="border border-gray-300 px-4 py-2">{Tayangan.sinopsis}</td>
                                            <td className="border border-gray-300 px-4 py-2"><a href={Tayangan.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Tayangan</a></td>
                                            <td className="border border-gray-300 px-4 py-2">{Tayangan.release_date_trailer}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <DetailSeriesLink href={`/detail-tayangan-series/${Tayangan.id}`} isActive={pathname === "/detail-tayangan-series"}>
                                                    More
                                                </DetailSeriesLink>
                                            </td>
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
// "use client";
// // import React from 'react';

// // function ModalSuksesUnduhan() {
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
// //       <div className="bg-gray-800 p-5 rounded-lg shadow-2xl text-center">
// //         <h2 className="text-lg font-bold text-green-500 mb-4">SUKSES MENAMBAHKAN TAYANGAN KE DAFTAR UNDUHAN!</h2>
        
// //         {/* Kotak/Card untuk teks dan tombol */}
// //         <div className="bg-gray-700 p-4 rounded-lg">
// //           <p className="text-white">Selamat! Anda telah berhasil mengunduh [Judul Tayangan] dan akan berlaku hingga [current time + 7 hari]. Cek informasi selengkapnya pada halaman daftar unduhan.</p>
// //           <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 focus:outline-none">Menuju Daftar Unduhan</button>
// //         </div>
        
// //       </div>
// //     </div>
// //   );
// // }

// // export default ModalSuksesUnduhan;


// import React from 'react';

// function ModalTambahFavorit() {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
//       <div className="bg-black-800 p-5 rounded-lg shadow-2xl text-center">
//         <h2 className="text-lg font-bold text-white mb-4">Tambah Ke Daftar Favorit</h2>
//         <label htmlFor="favorite-dropdown" className="block text-sm font-medium text-gray-200">Judul Daftar Favorit</label>
//         <div className="mt-1 relative">
//           <select id="favorite-dropdown" className="block w-full pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-gray-700 text-white">
//             <option>Pilih Favorit</option>
//             {/* Opsional diisi dengan data dinamis */}
//           </select>
//         </div>
//         <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 focus:outline-none">Tambah</button>
//       </div>
//     </div>
//   );
// }

// export default ModalTambahFavorit;


'use client'

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

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


// Dummy data for tayangan
const tayangan_global = [
    {
        peringkat: 1,
        judul: "Judul Tayangan 1 Global",
        sinopsis: "Sinopsis Tayangan 1",
        url: "https://www.youtube.com/watch?v=video1",
        tanggalRilis: "01/01/2022",
        totalView: 10000,
        tipe: "Series"
    },
    {
        peringkat: 2,
        judul: "Judul Tayangan 2 Global",
        sinopsis: "Sinopsis Tayangan 2 Global",
        url: "https://www.youtube.com/watch?v=video2",
        tanggalRilis: "02/01/2022",
        totalView: 15000,
        tipe: "Film"
    },
    // Tambahkan Tayangan lain di sini
];

const tayangan_country = [
    {
        peringkat: 1,
        judul: "Judul Tayangan 1 Country",
        sinopsis: "Sinopsis Tayangan 1 Country",
        url: "https://www.youtube.com/watch?v=video1",
        tanggalRilis: "01/01/2022",
        totalView: 10000,
        tipe: "Film"
    },
    {
        peringkat: 2,
        judul: "Judul Tayangan 2 Country",
        sinopsis: "Sinopsis Tayangan 2 Country",
        url: "https://www.youtube.com/watch?v=video2",
        tanggalRilis: "02/01/2022",
        totalView: 15000,
        tipe: "Film"
    },
    // Tambahkan Tayangan lain di sini
];

const filmtayangan = [
    {
        peringkat: 1,
        judul: "Film Tayangan 1",
        sinopsis: "Sinopsis Film Tayangan 1",
        url: "https://www.youtube.com/watch?v=film1",
        tanggalRilis: "01/01/2022",
    },
    {
        peringkat: 2,
        judul: "Film Tayangan 2",
        sinopsis: "Sinopsis Film Tayangan 2",
        url: "https://www.youtube.com/watch?v=film2",
        tanggalRilis: "02/01/2022",
    },
    // Tambahkan Tayangan film lain di sini
];

const seriestayangan = [
    {
        peringkat: 1,
        judul: "Series Tayangan 1",
        sinopsis: "Sinopsis Series Tayangan 1",
        url: "https://www.youtube.com/watch?v=series1",
        tanggalRilis: "01/01/2022",
    },
    {
        peringkat: 2,
        judul: "Series Tayangan 2",
        sinopsis: "Sinopsis Series Tayangan 2",
        url: "https://www.youtube.com/watch?v=series2",
        tanggalRilis: "02/01/2022",
    },
    // Tambahkan Tayangan series lain di sini
];

export default function Tayangan() {
    const [isActive, setIsActive] = useState(true);
    const [country, setCountry] = useState("Indonesia");
    const pathname = usePathname();

    const handleGlobalButtonClick = () => {
        setIsActive(true);
    };

    const handleCountryButtonClick = () => {
        setIsActive(false);
    };
    return (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8 mt-16">
            <h1 className="text-2xl font-semibold mt-10">Tayangan</h1>
            <form className="flex flex-col items-center gap-6">
                <label className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Search"
                        required
                        className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[500px] bg-white text-black focus:border-red-primary"
                    />
                </label>
            </form>
            <div className="max-w-3xl w-full p-4 rounded-lg shadow-md">
                <section>
                    <h2 className="text-lg font-bold my-4">10 Tayangan Terbaik Minggu Ini</h2>
                    <div className="flex mt-4">
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
                            <span className="text-white text-base">Opsi Top 10 {country}</span>
                        </div>
                    </div>
                    <table className="w-full my-4 text-left border-collapse border border-gray-400">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Peringkat</th>
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
                                ? tayangan_global.map((Tayangan, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 text-center px-4 py-2">{Tayangan.peringkat}</td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.judul}</td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.sinopsis}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <a href={Tayangan.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                                                Lihat Tayangan
                                            </a>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.tanggalRilis}</td>
                                        <td className="border border-gray-300 text-center px-4 py-2">{Tayangan.totalView}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {Tayangan.tipe === "Film" ? (
                                                <DetailFilmLink href="/detail-tayangan-film" isActive={pathname === "/detail-tayangan-film"}>
                                                    More
                                                </DetailFilmLink>
                                            ) : (
                                                <DetailSeriesLink href="/detail-tayangan-film" isActive={pathname === "/detail-tayangan-film"}>
                                                    More
                                                </DetailSeriesLink>
                                            )}
                                        </td>
                                    </tr>

                                ))
                                : tayangan_country.map((Tayangan, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 text-center px-4 py-2">{Tayangan.peringkat}</td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.judul}</td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.sinopsis}</td>
                                        <td className="border border-gray-300 px-4 py-2"><a href={Tayangan.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Tayangan</a></td>
                                        <td className="border border-gray-300 px-4 py-2">{Tayangan.tanggalRilis}</td>
                                        <td className="border border-gray-300 text-center px-4 py-2">{Tayangan.totalView}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {Tayangan.tipe === "Film" ? (
                                                <DetailFilmLink href="/detail-tayangan-film" isActive={pathname === "/detail-tayangan-film"}>
                                                    More
                                                </DetailFilmLink>
                                            ) : (
                                                <DetailSeriesLink href="/detail-tayangan-series" isActive={pathname === "/detail-tayangan-series"}>
                                                    More
                                                </DetailSeriesLink>
                                            )}
                                        </td>
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
                                <th className="border border-gray-300 px-4 py-2">Sinopsis Tayangan</th>
                                <th className="border border-gray-300 px-4 py-2">URL Tayangan</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal Rilis Tayangan</th>
                                <th className="border border-gray-300 px-4 py-2">Tayangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filmtayangan.map((Tayangan, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{Tayangan.judul}</td>
                                    <td className="border border-gray-300 px-4 py-2">{Tayangan.sinopsis}</td>
                                    <td className="border border-gray-300 px-4 py-2"><a href={Tayangan.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Tayangan</a></td>
                                    <td className="border border-gray-300 px-4 py-2">{Tayangan.tanggalRilis}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <DetailFilmLink href="/detail-tayangan-film" isActive={pathname === "/detail-tayangan-film"}>
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
                            {seriestayangan.map((Tayangan, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{Tayangan.judul}</td>
                                    <td className="border border-gray-300 px-4 py-2">{Tayangan.sinopsis}</td>
                                    <td className="border border-gray-300 px-4 py-2"><a href={Tayangan.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Lihat Tayangan</a></td>
                                    <td className="border border-gray-300 px-4 py-2">{Tayangan.tanggalRilis}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <DetailSeriesLink href="/detail-tayangan-series" isActive={pathname === "/detail-tayangan-series"}>
                                            More
                                        </DetailSeriesLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </section>
    );
}
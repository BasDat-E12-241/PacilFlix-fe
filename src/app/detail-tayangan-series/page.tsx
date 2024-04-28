'use client'

import React, { useState } from "react";
import { usePathname } from "next/navigation";

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

  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4 mt-16">
      <h1 className="text-2xl font-semibold mt-10">Halaman Series</h1>
      <h3 className="text-lg font-reguler">Judul</h3>
      <h1 className="text-2xl font-semibold">{seriesTayangan[0].judul}</h1>
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

    </section>
  );
}
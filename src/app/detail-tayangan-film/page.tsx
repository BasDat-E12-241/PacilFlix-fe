'use client'

import React, { useState } from "react";

// Dummy data for the Tayangan
const filmTayangan = [
  {
    peringkat: 1,
    judul: "Film Tayangan 1",
    url: "https://www.youtube.com/watch?v=film1",
    tanggalRilis: "01/01/2022",
    totalViews: "4000",
    durasi: "2 Jam 40 Menit",
    rating: "10.2",
    negara: "India",
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


export default function DetailsFilm() {
  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4 mt-16">
      <h1 className="text-2xl font-semibold mt-10">Halaman Film</h1>
      <h3 className="text-lg font-reguler">Judul</h3>
      <h1 className="text-2xl font-semibold">{filmTayangan[0].judul}</h1>
      <div className="flex mt-4">
        <div
          className={`rounded-full bg-red-primary mr-4 flex justify-center items-center p-1 w-40`}
        >
          <span className="text-white text-base">Tonton</span>
        </div>
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
      <div className="flex mt-4">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Total Views</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmTayangan[0].totalViews}
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Durasi Film</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmTayangan[0].durasi}
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">URL Film</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmTayangan[0].url.length > 20 ? filmTayangan[0].url.substring(0, 20) + "..." : filmTayangan[0].url}
          </div>
        </label>
      </div>
      <div className="flex mt-4">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Rating Rata-Rata</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmTayangan[0].rating}
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Tanggal Rilis Film</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmTayangan[0].tanggalRilis}
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">Asal Negara</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {filmTayangan[0].negara}
          </div>
        </label>
      </div>
      <div className="flex mt-4">
        <label className="flex flex-col">
          <span className="font-semibold mb-2">Sinopsis</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[790px] bg-white text-black focus:border-red-primary overflow-hidden">
            {filmTayangan[0].sinopsis}
          </div>
        </label>
      </div>
      <div className="flex mt-4 mb-20">
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Genre</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmTayangan[0].genre.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          </div>
        </label>
        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Pemain</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmTayangan[0].pemain.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        </label>

        <label className="flex flex-col gap-2 mr-4">
          <span className="font-semibold">Penulis Skenario</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmTayangan[0].penulis.map((writer, index) => (
                <li key={index}>{writer}</li>
              ))}
            </ul>
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-semibold">Sutradara</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[186px] bg-white text-black focus:border-red-primary overflow-hidden">
            <ul className="list-disc pl-5">
              {filmTayangan[0].sutradara.map((director, index) => (
                <li key={index}>{director}</li>
              ))}
            </ul>
          </div>
        </label>
      </div>

    </section>
  );
}
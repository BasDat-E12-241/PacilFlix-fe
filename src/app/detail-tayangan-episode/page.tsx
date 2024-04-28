'use client'

import React, { useState } from "react";

// Dummy data for the Tayangan
const seriesTayangan = [
  {
    peringkat: 1,
    judul: "Series Tayangan 1",
    episode: "Episode 1 Series 1",
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


export default function DetailsEpisode() {
  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4 mt-16">
      <h1 className="text-2xl font-semibold mt-10">Halaman Series</h1>
      <h3 className="text-lg font-reguler">Judul</h3>
      <h1 className="text-2xl font-semibold">{seriesTayangan[0].judul}</h1>
      <h3 className="text-lg font-reguler">Sub-Judul</h3>
      <h1 className="text-lg font-semibold">{seriesTayangan[0].episode}</h1>
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
        <div className="rounded-xl mr-4 border-red-primary border-2 flex flex-row justify-center p-2 w-[144px] box-sizing-border">
          <span className="font-semibold">
            Episode 1
          </span>
        </div>
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
          <span className="font-semibold">Tanggal Rilis Series</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {seriesTayangan[0].tanggalRilis}
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
      <div className="flex mt-4 mb-16">
        <label className="flex flex-col">
          <span className="font-semibold mb-2">Sinopsis</span>
          <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-[790px] bg-white text-black focus:border-red-primary overflow-hidden">
            {seriesTayangan[0].sinopsis}
          </div>
        </label>
      </div>
    </section>
  );
}
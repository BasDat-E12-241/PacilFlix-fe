'use client'

import React, { useEffect, useState } from 'react';
// import { useAuth } from "@/app/contexts/authContext";
import { useAuth } from "../contexts/authContext";
import { Client } from '@vercel/postgres';

// Dummy data for the subscription packages and transaction history
// const activeSubscription = {
//   nama: 'Premium',
//   harga: 'IDR 150,000',
//   resolusiLayar: '4K',
//   dukunganPerangkat: '4 devices',
//   tanggalDimulai: '2024-05-01',
//   tanggalAkhir: '2024-06-01'
// };

// const otherSubscriptions = [
//   { nama: 'Basic', harga: 'IDR 89,000', resolusiLayar: '1080p', dukunganPerangkat: '2 devices' },
//   { nama: 'Standard', harga: 'IDR 119,000', resolusiLayar: 'Full HD', dukunganPerangkat: '3 devices' },
//   // ...other subscription packages
// ];

// const transactionHistory = [
//   { namaPaket: 'Premium', tanggalDimulai: '2024-04-01', tanggalAkhir: '2024-05-01', metodePembayaran: 'Credit Card', tanggalPembayaran: '2024-04-01', totalPembayaran: 'IDR 150,000' },
//   // ...other transaction history records
// ];

type aktif = {
  nama: string;
  harga: number;
  resolusi_layar: string;
  dukungan_perangkat_list: string;
  start_date_time: Date;
  end_date_time: Date;
}
type otherSubscriptions = {
  nama: string;
  harga: number;
  resolusi_layar: string;
  // dukungan_perangkat: number;
  dukungan_perangkat_list:string;
}
type transactionHistory = {
  nama_paket: string;
  harga: number;
  resolusi_layar: string;
  dukungan_perangkat: number;
  start_date_time: Date;
  end_date_time: Date;
  metode_pembayaran: string;
  timestamp_pembayaran: Date;
}

export default function LanggananPage() {
  const{ username , isAuthenticated, negaraAsal, setIs_Aktif } = useAuth();
  const [aktif, setAktif] = useState<aktif[]>([]);
  const [otherSubscriptions, setOtherSubscriptions] = useState<otherSubscriptions[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<transactionHistory[]>([]);
  console.log(username); 
  useEffect(() => {
    if (username) {
      const fetchAktif = async () => {
        try {
          const response = await fetch(`/api/aktif/${username}?timestamp=${new Date().getTime()}`,{
            next:{
              tags:["aktif"],
            }
          });
          const data = await response.json();
          setAktif(data);
          setIs_Aktif(data.length > 0);
        } catch (error) {
          console.error('Failed to fetch langganan aktif:', error);
        }
      };

      fetchAktif();
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      const fetchOtherSubscriptions = async () => {
        try {
          const response = await fetch(`/api/otherSubscriptions`);
          const data = await response.json();
          setOtherSubscriptions(data);
        } catch (error) {
          console.error('Failed to fetch other subscriptions:', error);
        }
      };

      fetchOtherSubscriptions();
    }
  }, [username]);

  // const fetchTransactionHistory = async () => {
  //   try {
  //     const response = await fetch(`/api/transactions/${username}`);
  //     const data = await response.json();
  //     setTransactionHistory(data);
  //   } catch (error) {
  //     console.error('Failed to fetch transaction history:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (username) {

  //     fetchTransactionHistory();
  //   }
  // }, [username]);

  useEffect(() => {
    if (username) {
      const fetchTransactionHistory = async () => {
        try {
          const response = await fetch(`/api/transactions/${username}?timestamp=${new Date().getTime()}`,{
            next:{
              tags:["aktif"],
            }
          });
          const data = await response.json();
          setTransactionHistory(data);
        } catch (error) {
          console.error('Failed to fetch transaction history:', error);
        }
      };
  
      fetchTransactionHistory();
  
    }
  }, [username]);

  
  return (
      <div className="container mx-auto pt-8">
        <h1 className="text-center text-4xl my-8">Halaman Kelola Langganan</h1>
        
        <section>
          <h2 className="text-xl font-bold my-4">Paket langganan aktif saya:</h2>
          <table className="w-full my-4 text-left border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300">Nama</th>
                <th className="border border-gray-300">Harga</th>
                <th className="border border-gray-300">Resolusi Layar</th>
                <th className="border border-gray-300">Dukungan Perangkat</th>
                <th className="border border-gray-300">Tanggal Dimulai</th>
                <th className="border border-gray-300">Tanggal Akhir</th>
              </tr>
            </thead>
            <tbody>
              {aktif && aktif.length > 0 ? (
                aktif.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300">{item.nama}</td>
                    <td className="border border-gray-300">{item.harga}</td>
                    <td className="border border-gray-300">{item.resolusi_layar}</td>
                    <td className="border border-gray-300">{item.dukungan_perangkat_list}</td>
                    <td className="border border-gray-300">{new Date(item.start_date_time).toLocaleDateString('en-CA')}</td>
                    <td className="border border-gray-300">{new Date(item.end_date_time).toLocaleDateString('en-CA')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">No active subscription found.</td>
                </tr>
              )}
            </tbody>

          </table>
        </section>
        
        <section>
            <h2 className="text-xl font-bold my-4">Pilih Paket Lain:</h2>
            <table className="w-full my-4 text-left border-collapse border border-gray-400">
                <thead>
                <tr>
                    <th className="border border-gray-300">Nama</th>
                    <th className="border border-gray-300">Harga</th>
                    <th className="border border-gray-300">Resolusi Layar</th>
                    <th className="border border-gray-300">Dukungan Perangkat</th>
                    <th className="border border-gray-300">Beli</th>
                </tr>
                </thead>
                <tbody>
                {otherSubscriptions.map((subscription, index) => (
                    <tr key={index}>
                    <td className="border border-gray-300">{subscription.nama}</td>
                    <td className="border border-gray-300">{subscription.harga}</td>
                    <td className="border border-gray-300">{subscription.resolusi_layar}</td>
                    <td className="border border-gray-300">{subscription.dukungan_perangkat_list}</td>
                    <td className="border border-gray-300">
                      <a href={`/halaman-beli/${subscription.nama}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Beli</button>
                      </a>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>

        
        <section>
          <h2 className="text-xl font-bold my-4">Riwayat Transaksi:</h2>
          <table className="w-full my-4 text-left border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300">Nama Paket</th>
                <th className="border border-gray-300">tanggal dimulai</th>
                <th className="border border-gray-300">tanggal akhir</th>
                <th className="border border-gray-300">metode pembayaran</th>
                <th className="border border-gray-300">tanggal pembayaran</th>
                <th className="border border-gray-300">total pembayaran</th>
              </tr>
            </thead>
            <tbody>
            {transactionHistory.map((history, index) => (
              <tr key={index}>
                <td className="border border-gray-300">{history.nama_paket}</td>
                <td className="border border-gray-300">{new Date(history.start_date_time).toLocaleDateString('en-CA')}</td>
                <td className="border border-gray-300">{new Date(history.end_date_time).toLocaleDateString('en-CA')}</td>
                <td className="border border-gray-300">{history.metode_pembayaran}</td>
                <td className="border border-gray-300">{new Date(history.timestamp_pembayaran).toLocaleDateString('en-CA')}</td>
                <td className="border border-gray-300">{history.harga}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </section>
      </div>
    );
}

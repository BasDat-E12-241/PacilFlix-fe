import React from 'react';

// Dummy data for the subscription packages and transaction history
const activeSubscription = {
  nama: 'Premium',
  harga: 'IDR 150,000',
  resolusiLayar: '4K',
  dukunganPerangkat: '4 devices',
  tanggalDimulai: '2024-05-01',
  tanggalAkhir: '2024-06-01'
};

const otherSubscriptions = [
  { nama: 'Basic', harga: 'IDR 89,000', resolusiLayar: '1080p', dukunganPerangkat: '2 devices' },
  { nama: 'Standard', harga: 'IDR 119,000', resolusiLayar: 'Full HD', dukunganPerangkat: '3 devices' },
  // ...other subscription packages
];

const transactionHistory = [
  { namaPaket: 'Premium', tanggalDimulai: '2024-04-01', tanggalAkhir: '2024-05-01', metodePembayaran: 'Credit Card', tanggalPembayaran: '2024-04-01', totalPembayaran: 'IDR 150,000' },
  // ...other transaction history records
];

export default function LanggananPage() {
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
              <tr>
                <td className="border border-gray-300">{activeSubscription.nama}</td>
                <td className="border border-gray-300">{activeSubscription.harga}</td>
                <td className="border border-gray-300">{activeSubscription.resolusiLayar}</td>
                <td className="border border-gray-300">{activeSubscription.dukunganPerangkat}</td>
                <td className="border border-gray-300">{activeSubscription.tanggalDimulai}</td>
                <td className="border border-gray-300">{activeSubscription.tanggalAkhir}</td>
              </tr>
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
                    <td className="border border-gray-300">{subscription.resolusiLayar}</td>
                    <td className="border border-gray-300">{subscription.dukunganPerangkat}</td>
                    <td className="border border-gray-300">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Beli</button>
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
                <th className="border border-gray-300">Tanggal Dimulai</th>
                <th className="border border-gray-300">Tanggal Akhir</th>
                <th className="border border-gray-300">Metode Pembayaran</th>
                <th className="border border-gray-300">Tanggal Pembayaran</th>
                <th className="border border-gray-300">Total Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((history, index) => (
                <tr key={index}>
                  <td className="border border-gray-300">{history.namaPaket}</td>
                  <td className="border border-gray-300">{history.tanggalDimulai}</td>
                  <td className="border border-gray-300">{history.tanggalAkhir}</td>
                  <td className="border border-gray-300">{history.metodePembayaran}</td>
                  <td className="border border-gray-300">{history.tanggalPembayaran}</td>
                  <td className="border border-gray-300">{history.totalPembayaran}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }

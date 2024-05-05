    "use client"

    import router, { useRouter } from 'next/router';
    import React, { useState } from 'react';
    import { useParams } from 'next/navigation';

    export default function HalamanBeli() {
       const {tipe} = useParams()
       const [paymentMethod, setPaymentMethod] = useState('transfer'); 

    const packageDetails = {
        nama: tipe, 
        harga: 'IDR 150,000', 
        resolusiLayar: '4K',
        dukunganPerangkat: '4 devices', 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="container mx-auto pt-8">
            <h1 className="text-center text-4xl my-8">Halaman Beli</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-bold my-4">Informasi Paket yang ingin Dibeli:</h2>
                <table className="w-full my-4 text-left border-collapse border border-gray-400">
                <tbody>
                    <tr>
                    <td className="border border-gray-300">{packageDetails.nama}</td>
                    <td className="border border-gray-300">{packageDetails.harga}</td>
                    <td className="border border-gray-300">{packageDetails.resolusiLayar}</td>
                    <td className="border border-gray-300">{packageDetails.dukunganPerangkat}</td>
                    </tr>
                </tbody>
                </table>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold my-4">Pilih Metode Pembayaran:</h2>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mb-4 p-2 border border-gray-400 rounded"
                    >
                    <option value="transfer">Transfer</option>
                    <option value="creditcard">Credit Card</option>
                    <option value="e-wallet">E-Wallet</option>
                    </select>
                    <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Bayar
                    </button>

                </div>
            </form>
        </div>
    );
    }

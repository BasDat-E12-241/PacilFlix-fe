"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { useAuth } from "../../contexts/authContext";
import { revalidateTag } from 'next/cache';
export default function HalamanBeli() {
    const{ username , isAuthenticated, negaraAsal } = useAuth();
    const params = useParams();
    const { tipe} = params; 
    console.log(tipe);
    const [packageDetails, setPackageDetails] = useState({
        nama: '',
        harga: '',
        resolusiLayar: '',
        dukunganPerangkat: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('transfer');

    useEffect(() => {
        if (tipe) {
            const fetchData = async () => {
                const response = await fetch(`/api/halaman-beli/${tipe}`);
                const data = await response.json();
                if (data.length > 0) {
                    setPackageDetails({
                        nama: data[0].nama,
                        harga: data[0].harga,
                        resolusiLayar: data[0].resolusi_layar,
                        dukunganPerangkat: data[0].dukungan_perangkat_list,
                    });
                }
            };
            fetchData();
        }
    }, [tipe]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isAuthenticated) {
            alert('Please log in to proceed');
            return;
        }
    
        try {
            const body = {
                nama_paket: packageDetails.nama,
                metode_pembayaran: paymentMethod,
                harga: packageDetails.harga
            };
            const nama_paket = packageDetails.nama;
            const harga = packageDetails.harga;
            const response = await fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nama_paket,paymentMethod,harga,username}),
            });
    
            const data = await response.json();
            if (response.ok) {
                
                alert('Purchase successful!');
                window.location.href = '/langganan';
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            alert(error.message);
        }
    };
    
    return (
        <div className="container mx-auto pt-8">
            <h1 className="text-center text-4xl my-8">Halaman Beli</h1>
            <form onSubmit={handleSubmit} className="bg-primary shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                        className="mb-4 p-2 border border-gray-400 rounded bg-gray-600"
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

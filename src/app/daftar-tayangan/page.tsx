"use client";
import React from 'react';

function ModalSuksesUnduhan() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-gray-800 p-5 rounded-lg shadow-2xl text-center">
        <h2 className="text-lg font-bold text-green-500 mb-4">SUKSES MENAMBAHKAN TAYANGAN KE DAFTAR UNDUHAN!</h2>
        
        {/* Kotak/Card untuk teks dan tombol */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-white">Selamat! Anda telah berhasil mengunduh [Judul Tayangan] dan akan berlaku hingga [current time + 7 hari]. Cek informasi selengkapnya pada halaman daftar unduhan.</p>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 focus:outline-none">Menuju Daftar Unduhan</button>
        </div>
        
      </div>
    </div>
  );
}

export default ModalSuksesUnduhan;


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

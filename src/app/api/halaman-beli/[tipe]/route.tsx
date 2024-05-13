import { sql } from '@vercel/postgres';
import { useParams } from 'next/navigation';

export async function GET(
  request: Request,
  {params}:{params:{tipe:string,dukungan_perangkat: string}}
) {
  console.log("testttt" ,params.tipe);
  try {
    let query;
    // query = await sql`
    //     select p.nama,p.harga,p.resolusi_layar,dp.dukungan_perangkat
    //     from paket p
    //     join dukungan_perangkat dp on dp.nama_paket = p.nama
    //     where p.nama = ${params.tipe} and dp.dukungan_perangkat = ${params.dukungan_perangkat}
    // `;
    query = await sql`
    SELECT 
    p.nama,
    p.harga,
    p.resolusi_layar,
    STRING_AGG(dp.dukungan_perangkat, ', ') AS dukungan_perangkat_list
    FROM 
      paket p
    JOIN 
      dukungan_perangkat dp ON dp.nama_paket = p.nama
    where p.nama = ${params.tipe}
    GROUP BY 
      p.nama
    `;
    const { rows: halaman_beli } = await query;
    return Response.json(halaman_beli, { status: 200 });
  } catch (error) {
    console.error('Error fetching halaman_beli:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
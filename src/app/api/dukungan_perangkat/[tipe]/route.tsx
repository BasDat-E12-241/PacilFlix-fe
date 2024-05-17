import { sql } from '@vercel/postgres';
import { useParams } from 'next/navigation';

export async function GET(
  request: Request,
  {params}:{params:{tipe:string}}
) {
  console.log("testttt" ,params.tipe);
  try {
    let query;
    query = await sql`
        select dp.dukungan_perangkat
        from paket p
        join dukungan_perangkat dp on dp.nama_paket = p.nama
        where p.nama = ${params.tipe} 
    `;
    const { rows: halaman_beli } = await query;
    return Response.json(halaman_beli, { status: 200 });
  } catch (error) {
    console.error('Error fetching halaman_beli:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
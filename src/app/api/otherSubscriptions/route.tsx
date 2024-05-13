import { sql } from '@vercel/postgres';
import { useParams } from 'next/navigation';

export async function GET(
  request: Request,
) {
  try {
    let query;
    // query = await sql`
    // SELECT p.nama,p.harga,p.resolusi_layar,dp.dukungan_perangkat,t.start_date_time,t.end_date_time
    // from paket p
    // join dukungan_perangkat dp on dp.nama_paket = p.nama
    // join transaction t on t.nama_paket = p.nama
    // where t.username = ${params.username}
    // `;
    // query = await sql`
    //     select p.nama,p.harga,p.resolusi_layar,dp.dukungan_perangkat
    //     from paket p
    //     join dukungan_perangkat dp on dp.nama_paket = p.nama
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
      GROUP BY 
        p.nama
    `;
    const { rows: otherSubscriptions } = await query;
    return Response.json(otherSubscriptions, { status: 200 });
  } catch (error) {
    console.error('Error fetching otherSubscriptions:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
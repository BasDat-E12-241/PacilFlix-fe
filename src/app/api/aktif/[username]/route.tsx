import { sql } from '@vercel/postgres';
import { useParams } from 'next/navigation';
import { revalidateTag, unstable_noStore as noStore} from 'next/cache';

export async function GET(
  request: Request,
  {params}:{params:{username:string}}

) {
  console.log("aktif", params.username);
  noStore()
  try {
    if(params.username){
      let query;
      query = await sql`
      SELECT 
          p.nama, 
          p.harga, 
          p.resolusi_layar, 
          STRING_AGG(dp.dukungan_perangkat, ', ') AS dukungan_perangkat_list, 
          t.start_date_time, 
          t.end_date_time
      FROM 
          paket p
      JOIN 
          dukungan_perangkat dp ON dp.nama_paket = p.nama
      JOIN 
          transaction t ON t.nama_paket = p.nama
      WHERE 
          t.end_date_time >= CURRENT_TIMESTAMP 
          AND t.username = ${params.username}
      GROUP BY 
          p.nama, p.harga, p.resolusi_layar, t.start_date_time, t.end_date_time
  
  
      `;
      console.log(query);
      const { rows: aktif } = await query;
      return Response.json(aktif, { status: 200,headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      } });

    }
  } catch (error) {
    console.error('Error fetching aktif:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

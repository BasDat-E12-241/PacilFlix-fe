import { sql } from '@vercel/postgres';
import { useParams } from 'next/navigation';

export async function GET(
  request: Request,
  {params}:{params:{username:string}}
) {
  console.log("nama  ",params.username);
  if(params.username){
    try {
      let query;
      query = await sql`
      SELECT t.nama_paket,t.start_date_time,t.end_date_time,t.metode_pembayaran,t.timestamp_pembayaran,p.harga
      from transaction t
      join paket p on t.nama_paket = p.nama
      where t.username = ${params.username}
      `;
      const { rows: transactions } = await query;
      const namaa = params.username;
      return Response.json(transactions,  { status: 200 });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return Response.json({ message: 'Server error' }, { status: 500 });
    }

  }
}
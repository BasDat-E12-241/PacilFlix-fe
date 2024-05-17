// import { sql } from '@vercel/postgres';

// export default async function handler(req: Request, res) {
//     const { nama_paket, paymentMethod, harga } = await req.json();

//     console.log(nama_paket,paymentMethod,harga);
//     if (req.method !== 'POST') {
//         return res.status(405).end('Method Not Allowed');
//     }

//     try {

//         res.status(200).json({ message: 'Transaction processed successfully' });
//     } catch (error) {
//         console.error('Error processing transaction:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// }

import { revalidateTag, unstable_noStore as noStore} from 'next/cache';
import { useAuth } from '../../contexts/authContext';
import { sql } from '@vercel/postgres';
export async function POST(req: Request) {
    const { nama_paket, paymentMethod, harga,username } = await req.json();
    console.log(nama_paket,paymentMethod,harga,username);
    noStore()
    
    const { rows } = await sql`
    INSERT INTO TRANSACTION(
        USERNAME,
        START_DATE_TIME,
        END_DATE_TIME,
        NAMA_PAKET,
        METODE_PEMBAYARAN,
        TIMESTAMP_PEMBAYARAN
      ) VALUES (
        ${username},  
        CURRENT_DATE,  
        CURRENT_DATE + INTERVAL '30 days',
        ${nama_paket},            
        ${paymentMethod},                
        CURRENT_TIMESTAMP     
      )
      RETURNING * 
  `;
  console.log("masuk");
  revalidateTag("aktif");
  if (rows.length > 0) {
    return Response.json(
      { message: ' berhasil create' },
      { status: 200 }
    );
  } else {
    return Response.json(
      { message: `berhasil update` },
      { status: 201 }
    );
  }
}
// pages/api/downloads.js
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(
    request: Request,
    {params}:{params:{username:string}}
  
){
  const username = params.username;
  noStore(); 
    
  if (!username) {
    return Response.json({ message: 'Server error' }, { status: 500 });
  }

  try {
    const { rows } = await sql`
      SELECT t.id as id_tayangan, t.judul AS judul, td.timestamp AS timestamp
      FROM tayangan_terunduh td
      JOIN tayangan t ON td.id_tayangan = t.id
      WHERE td.username = ${username}
      ORDER BY td.timestamp DESC;
    `;
    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching download list:', error);

    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

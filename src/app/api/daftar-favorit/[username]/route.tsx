import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  noStore();  // Disable caching for this request
  if (!username) {
    return Response.json({ message: 'Username is required' }, { status: 400 });
  }

  try {
    const { rows } = await sql`
      SELECT df.timestamp, df.judul, t.id as id_tayangan
      FROM daftar_favorit df
      JOIN tayangan t ON df.judul = t.judul
      WHERE df.username = ${username}
      ORDER BY df.timestamp DESC;
    `;
    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching favorites list:', error);

    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(
  request: Request
) {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');
  const timestamp = url.searchParams.get('timestamp');

  const timestampWithAddedHours = timestamp ? new Date(timestamp) : null;
  if (timestampWithAddedHours) {
    timestampWithAddedHours.setHours(timestampWithAddedHours.getHours() + 7);
  }
  const timestampString = timestampWithAddedHours ? timestampWithAddedHours.toISOString().replace('T', ' ').slice(0, -5) : null;

  noStore();  // Disable caching for this request

  noStore();  // Disable caching for this request
  if (!username) {
    return Response.json({ message: 'Username is required' }, { status: 400 });
  }

  try {
    const { rows } = await sql`
      SELECT tmdf.timestamp, t.id as id_tayangan
      FROM tayangan_memiliki_daftar_favorit tmdf
      JOIN tayangan t ON tmdf.id_tayangan = t.id
      WHERE tmdf.username = ${username} AND tmdf.timestamp = ${timestampString}
    `;
    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching favorites list:', error);

    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
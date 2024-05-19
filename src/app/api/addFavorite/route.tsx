import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function POST(request: Request) {
  const url = new URL(request.url);
  const id_tayangan = url.searchParams.get('id_tayangan');
  const username = url.searchParams.get('username');
  const timestamp = url.searchParams.get('timestamp');

  const timestampWithAddedHours = timestamp ? new Date(timestamp) : null;
  if (timestampWithAddedHours) {
    timestampWithAddedHours.setHours(timestampWithAddedHours.getHours() + 7);
  }
  const timestampString = timestampWithAddedHours ? timestampWithAddedHours.toISOString().replace('T', ' ').slice(0, -5) : null;

  noStore();  // Disable caching for this request

  if (!id_tayangan || !username || !timestampString) {
    return new Response(JSON.stringify({ message: `${id_tayangan}, ${username}, ${timestampString}` }), { status: 400 });
  }

  console.log('Adding favorite:', id_tayangan, username, timestampString);

  try {
    const result = await sql`
      INSERT INTO tayangan_memiliki_daftar_favorit (id_tayangan, timestamp, username)
      VALUES (${id_tayangan}, ${timestampString}, ${username})
      RETURNING *;
    `;

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error adding download:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

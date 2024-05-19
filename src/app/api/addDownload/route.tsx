import { sql } from '@vercel/postgres';

export async function POST(request) {
  const { id_tayangan, username } = await request.json();

  if (!id_tayangan || !username) {
    return new Response(JSON.stringify({ message: 'ID tayangan dan username diperlukan' }), { status: 400 });
  }

  try {
    const result = await sql`
      INSERT INTO tayangan_terunduh (id_tayangan, username, timestamp)
      VALUES (${id_tayangan}, ${username}, CURRENT_TIMESTAMP)
      RETURNING *;
    `;

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error adding download:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

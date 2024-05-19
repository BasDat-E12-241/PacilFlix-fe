import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const id_tayangan = searchParams.get('id_tayangan');
  noStore();  // Disable caching for this request

  if (!username || !id_tayangan) {
    return new Response(JSON.stringify({ message: 'Username and ID Tayangan are required' }), { status: 400 });
  }

  try {
    const result = await sql`
      DELETE FROM tayangan_terunduh
      WHERE username = ${username} AND id_tayangan = ${id_tayangan}
    `;
    if (result.rowCount > 0) {
      return new Response(JSON.stringify({ message: 'Successfully deleted' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting download:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
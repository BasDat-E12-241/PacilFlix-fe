import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const judul = searchParams.get('judul');
  noStore();  // Disable caching for this request

  if (!username || !judul) {
    return new Response(JSON.stringify({ message: 'Username and ID Tayangan are required' }), { status: 400 });
  }

  try {
    const result = await sql`
      DELETE FROM daftar_favorit
      WHERE username = ${username} AND judul = ${judul}
      returning *
    `;
    if (result.rowCount > 0) {
      return new Response(JSON.stringify({ message: 'Successfully deleted' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting favorite:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

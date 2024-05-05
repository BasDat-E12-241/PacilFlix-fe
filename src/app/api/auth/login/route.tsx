import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const { rows } = await sql`
    SELECT * from pengguna
    WHERE username = ${username}
    AND password = ${password}
  `;

  if (rows.length > 0) {
    return Response.json(
      { message: 'Login berhasil' },
      { status: 200 }
    );
  } else {
    return Response.json(
      { message: 'Username atau Password salah' },
      { status: 401 }
    );
  }
}
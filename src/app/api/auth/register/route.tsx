import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const { username, password, negara_asal } = await req.json();

  const { rows: users } = await sql`
    SELECT username from pengguna
  `;

  if (users.some((user: any) => user.username === username)) {
    return Response.json(
      { message: 'Username sudah terdaftar' },
      { status: 401 }
    );
  }

  const { rows } = await sql`
    INSERT INTO pengguna
    VALUES (${username}, ${password}, ${negara_asal})
    RETURNING *
  `;

  if (rows.length > 0) {
    return Response.json(
      { message: 'Register berhasil' },
      { status: 200 }
    );
  } else {
    return Response.json(
      { message: `Register gagal` },
      { status: 401 }
    );
  }
}
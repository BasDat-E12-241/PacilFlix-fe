import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const { id_tayangan, username, start_date_time, end_date_time } = await req.json();

  const { rows } = await sql`
    INSERT INTO riwayat_nonton
    VALUES (${id_tayangan}, ${username}, ${start_date_time}, ${end_date_time})
    RETURNING *
  `;

  console.log(rows);

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
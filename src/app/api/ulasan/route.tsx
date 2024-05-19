import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';

export async function POST(
    request: Request,
) {
    unstable_noStore()
    try {
        const requestBody = await request.json();
        console.log(requestBody);

        // Mendapatkan data dari body request
        const { id_tayangan, username, rating, deskripsi } = requestBody;

        // Memanggil stored procedure create_review dengan parameter yang sesuai
        const query = await sql`
        INSERT INTO ulasan (id_tayangan, username, timestamp, rating, deskripsi)
        VALUES (${id_tayangan}, ${username}, CURRENT_TIMESTAMP, ${rating}, ${deskripsi})
        RETURNING *;        
        `;

        return Response.json({ message: 'Ulasan telah berhasil ditambahkan' }, { status: 200 });
    } catch (error) {
        console.error('Error adding review:', error);
        return Response.json({ message: 'Gagal menambah ulasan' }, { status: 500 });
    }
}

import { sql } from '@vercel/postgres';
import { UUID } from 'crypto';
import { unstable_noStore } from 'next/cache';

export async function GET(
    request: Request,
    {params}:{params:{idTayangan:UUID}}
) {
    unstable_noStore()
    try {
        // Memeriksa apakah ID tayangan sudah diberikan dalam query string
        if (!params.idTayangan) {
            return Response.json({ message: 'ID tayangan tidak ditemukan dalam query string' }, { status: 400 });
        }

        // Mengambil data ulasan berdasarkan ID tayangan
        const query = await sql`
            SELECT
                id_tayangan,
                username,
                rating,
                deskripsi
            FROM
                ulasan
            WHERE
                id_tayangan = ${params.idTayangan};
        `;

        const { rows: reviews } = await query;

        return Response.json(reviews, { status: 200 });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return Response.json({ message: 'Server error' }, { status: 500 });
    }
}

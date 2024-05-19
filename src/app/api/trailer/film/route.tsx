import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';

export async function GET(
    request: Request,
) {
    unstable_noStore()
    try {
        let query;
        query = await sql`
            SELECT
                judul,
                sinopsis,
                url_video_trailer,
                TO_CHAR(release_date_trailer, 'YYYY-MM-DD') AS release_date_trailer
            FROM
                tayangan
            WHERE
                id IN (SELECT id_tayangan FROM film)
            ORDER BY
                release_date_trailer DESC;
        `;
        const { rows: film_trailers } = await query;
        return Response.json(film_trailers, { status: 200 });
    } catch (error) {
        console.error('Error fetching film_trailers:', error);
        return Response.json({ message: 'Server error' }, { status: 500 });
    }
}
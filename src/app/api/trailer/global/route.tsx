import { sql } from '@vercel/postgres';
import { useParams } from 'next/navigation';
import { Request, Response } from 'express'; // Add this line
import { unstable_noStore } from 'next/cache';

export async function GET(
    request: Request,
) {
    unstable_noStore()
    try {
        const url = new URL(request.url);
        const search = url.searchParams.get('search');

        console.log('Search parameter:', search);
        let query;

        if (search != null) {
            query = await sql`
        WITH tayangan_durasi AS (
            SELECT
                t.id,
                t.judul,
                t.sinopsis,
                t.url_video_trailer,
                TO_CHAR(t.release_date_trailer, 'YYYY-MM-DD') AS release_date_trailer,
                COALESCE(f.durasi_film, e.total_durasi) AS durasi
            FROM
                tayangan t
                    LEFT JOIN
                film f ON t.id = f.id_tayangan
                    LEFT JOIN (
                    SELECT
                        s.id_tayangan AS id_tayangan,
                        SUM(ep.durasi) AS total_durasi
                    FROM
                        series s
                            JOIN
                        episode ep ON s.id_tayangan = ep.id_series
                    GROUP BY
                        s.id_tayangan
                ) e ON t.id = e.id_tayangan
        ),
             riwayat_durasi AS (
                 SELECT
                     rn.id_tayangan,
                     rn.username,
                     rn.start_date_time,
                     rn.end_date_time,
                     SUM(EXTRACT(EPOCH FROM (rn.end_date_time - rn.start_date_time))) AS durasi_menonton
                 FROM
                     riwayat_nonton rn
                WHERE
                    rn.start_date_time >= NOW() - INTERVAL '7 days'
                 GROUP BY
                     rn.id_tayangan, rn.username, rn.start_date_time, rn.end_date_time
             )
        SELECT
            td.judul,
            td.sinopsis,
            td.url_video_trailer,
            td.release_date_trailer,
            COUNT(rn.id_tayangan) AS total_view
        FROM
            tayangan_durasi td
                LEFT JOIN 
            riwayat_durasi rn
            ON
                td.id = rn.id_tayangan
                    AND
                rn.durasi_menonton >= (0.7 * td.durasi)
        GROUP BY
            td.id, td.judul, td.sinopsis, td.url_video_trailer, td.release_date_trailer
        ORDER BY
            total_view DESC,
            td.release_date_trailer ASC;
    `;
        } else {

            query = await sql`
            WITH tayangan_durasi AS (
                SELECT
                    t.id,
                    t.judul,
                    t.sinopsis,
                    t.url_video_trailer,
                    TO_CHAR(t.release_date_trailer, 'YYYY-MM-DD') AS release_date_trailer,
                    COALESCE(f.durasi_film, e.total_durasi) AS durasi
                FROM
                    tayangan t
                        LEFT JOIN
                    film f ON t.id = f.id_tayangan
                        LEFT JOIN (
                        SELECT
                            s.id_tayangan AS id_tayangan,
                            SUM(ep.durasi) AS total_durasi
                        FROM
                            series s
                                JOIN
                            episode ep ON s.id_tayangan = ep.id_series
                        GROUP BY
                            s.id_tayangan
                    ) e ON t.id = e.id_tayangan
            ),
                 riwayat_durasi AS (
                     SELECT
                         rn.id_tayangan,
                         rn.username,
                         rn.start_date_time,
                         rn.end_date_time,
                         SUM(EXTRACT(EPOCH FROM (rn.end_date_time - rn.start_date_time))) AS durasi_menonton
                     FROM
                         riwayat_nonton rn
                    WHERE
                        rn.start_date_time >= NOW() - INTERVAL '7 days'
                     GROUP BY
                         rn.id_tayangan, rn.username, rn.start_date_time, rn.end_date_time
                 )
            SELECT
                td.judul,
                td.sinopsis,
                td.url_video_trailer,
                td.release_date_trailer,
                COUNT(rn.id_tayangan) AS total_view
            FROM
                tayangan_durasi td
                    LEFT JOIN 
                riwayat_durasi rn
                ON
                    td.id = rn.id_tayangan
                        AND
                    rn.durasi_menonton >= (0.7 * td.durasi)
            WHERE 
                LOWER(td.judul) LIKE ${'%' + (search ?? '') + '%'}
            GROUP BY
                td.id, td.judul, td.sinopsis, td.url_video_trailer, td.release_date_trailer
            ORDER BY
                total_view DESC,
                td.release_date_trailer ASC;
        `;
        }


        const { rows: trailer_globals } = await query;
        return Response.json(trailer_globals, { status: 200 });
    } catch (error) {
        console.error('Error fetching trailer_globals:', error);
        return Response.json({ message: 'Server error' }, { status: 500 });
    }
}

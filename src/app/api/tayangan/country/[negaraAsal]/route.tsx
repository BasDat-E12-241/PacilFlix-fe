import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';
import { useParams } from 'next/navigation';

export async function GET(
    request: Request,
    {params}:{params:{negaraAsal:string}}
) {
    unstable_noStore()
    try {
        console.log("testttt" ,params.negaraAsal);
        let query;
        query = await sql`
    WITH tayangan_durasi AS (
        SELECT
            t.id,
            t.judul,
            t.sinopsis,
            t.url_video_trailer,
            TO_CHAR(t.release_date_trailer, 'YYYY-MM-DD') AS release_date_trailer,
            COALESCE(f.durasi_film, e.total_durasi) AS durasi,
            CASE
                    WHEN f.id_tayangan IS NOT NULL THEN 'Film'
                    WHEN s.id_tayangan IS NOT NULL THEN 'Series'
                    ELSE 'Unknown'
                END AS tipe
        FROM
            tayangan t
        LEFT JOIN
            film f ON t.id = f.id_tayangan
        LEFT JOIN
            series s ON t.id = s.id_tayangan
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
        WHERE t.asal_negara = ${params.negaraAsal}
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
         td.id,
        td.judul,
        td.sinopsis,
        td.url_video_trailer,
        td.release_date_trailer,
        td.tipe,
        COUNT(rn.id_tayangan) AS total_view
    FROM
        tayangan_durasi td
    LEFT JOIN 
        riwayat_durasi rn ON td.id = rn.id_tayangan
    GROUP BY
        td.id, td.judul, td.sinopsis, td.url_video_trailer, td.release_date_trailer, td.tipe
    ORDER BY
        total_view DESC,
        td.release_date_trailer ASC;
`;
        const { rows: trailer_globals } = await query;
        return Response.json(trailer_globals, { status: 200 });
    } catch (error) {
        console.error('Error fetching trailer_globals:', error);
        return Response.json({ message: 'Server error' }, { status: 500 });
    }
}
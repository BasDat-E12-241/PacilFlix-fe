import { sql } from '@vercel/postgres';
import { UUID } from 'crypto';
import { unstable_noStore } from 'next/cache';

export async function GET(
    request: Request,
    {params}:{params:{idTayangan:UUID}}
) {
    try {
        unstable_noStore()
        let query;
        query = await sql`
        WITH views AS (
            SELECT 
                rn.id_tayangan,
                COUNT(*) AS total_views
            FROM riwayat_nonton rn
            JOIN series s ON rn.id_tayangan = s.id_tayangan
            JOIN episode e ON s.id_tayangan = e.id_series
            WHERE (EXTRACT(EPOCH FROM (end_date_time - start_date_time)) / 60) >= (e.durasi * 0.7)
            GROUP BY rn.id_tayangan
        ),
        genres AS (
            SELECT
                gt.id_tayangan,
                STRING_AGG(gt.genre, ', ') AS list_genre
            FROM genre_tayangan gt
            GROUP BY gt.id_tayangan
        ),
        pemain AS (
            SELECT
                mt.id_tayangan,
                STRING_AGG(c.nama, ', ') AS list_pemain
            FROM memainkan_tayangan mt
            JOIN pemain p ON mt.id_pemain = p.id
            JOIN contributors c ON p.id = c.id
            GROUP BY mt.id_tayangan
        ),
        penulis_skenario AS (
            SELECT
                mst.id_tayangan,
                STRING_AGG(c.nama, ', ') AS list_penulis_skenario
            FROM menulis_skenario_tayangan mst
            JOIN penulis_skenario ps ON mst.id_penulis_skenario = ps.id
            JOIN contributors c ON ps.id = c.id
            GROUP BY mst.id_tayangan
        ),
        sutradara_info AS (
            SELECT
                t.id AS id_tayangan,
                c.nama AS nama_sutradara
            FROM tayangan t
            JOIN sutradara s ON t.id_sutradara = s.id
            JOIN contributors c ON s.id = c.id
        ),
        episode_count AS (
            SELECT
                e.id_series,
                COUNT(*) AS total_episodes,
                SUM(e.durasi) AS total_durasi
            FROM episode e
            GROUP BY e.id_series
        )
        SELECT 
            t.judul,
            COALESCE(v.total_views, 0) AS total_views,
            t.release_date_trailer AS release_date,
            t.asal_negara,
            t.sinopsis,
            t.url_video_trailer AS url_video,
            g.list_genre,
            p.list_pemain,
            ps.list_penulis_skenario,
            si.nama_sutradara,
            COALESCE(ec.total_episodes, 0) AS total_episodes,
            COALESCE(ec.total_durasi, 0) AS total_durasi
        FROM series s
        JOIN tayangan t ON s.id_tayangan = t.id
        LEFT JOIN views v ON s.id_tayangan = v.id_tayangan
        LEFT JOIN genres g ON s.id_tayangan = g.id_tayangan
        LEFT JOIN pemain p ON s.id_tayangan = p.id_tayangan
        LEFT JOIN penulis_skenario ps ON s.id_tayangan = ps.id_tayangan
        LEFT JOIN sutradara_info si ON t.id = si.id_tayangan
        LEFT JOIN episode_count ec ON s.id_tayangan = ec.id_series
        WHERE s.id_tayangan = ${params.idTayangan}
        ORDER BY t.judul;                       
        `;
        const { rows: film_info } = await query;
        return Response.json(film_info, { status: 200 });
    } catch (error) {
        console.error('Error fetching film information:', error);
        return Response.json({ message: 'Server error' }, { status: 500 });
    }
}

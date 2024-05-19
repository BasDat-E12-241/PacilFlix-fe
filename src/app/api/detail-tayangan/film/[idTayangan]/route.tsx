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
            JOIN film f ON rn.id_tayangan = f.id_tayangan
            WHERE (EXTRACT(EPOCH FROM (end_date_time - start_date_time)) / 60) >= (f.durasi_film * 0.7)
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
        sutradara AS (
            SELECT
                t.id AS id_tayangan,
                c.nama AS nama_sutradara
            FROM tayangan t
            JOIN sutradara s ON t.id_sutradara = s.id
            JOIN contributors c ON s.id = c.id
        )
        SELECT 
            t.judul,
            f.durasi_film,
            f.url_video_film,
            COALESCE(v.total_views, 0) AS total_views,
            f.release_date_film,
            t.asal_negara,
            t.sinopsis,
            g.list_genre,
            p.list_pemain,
            ps.list_penulis_skenario,
            s.nama_sutradara
        FROM film f
        JOIN tayangan t ON f.id_tayangan = t.id
        LEFT JOIN views v ON f.id_tayangan = v.id_tayangan
        LEFT JOIN genres g ON f.id_tayangan = g.id_tayangan
        LEFT JOIN pemain p ON f.id_tayangan = p.id_tayangan
        LEFT JOIN penulis_skenario ps ON f.id_tayangan = ps.id_tayangan
        LEFT JOIN sutradara s ON t.id = s.id_tayangan
        WHERE f.id_tayangan = ${params.idTayangan}
        ORDER BY t.judul;                
        `;
        const { rows: film_info } = await query;
        return Response.json(film_info, { status: 200 });
    } catch (error) {
        console.error('Error fetching film information:', error);
        return Response.json({ message: 'Server error' }, { status: 500 });
    }
}

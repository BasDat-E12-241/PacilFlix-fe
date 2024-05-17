import { sql } from '@vercel/postgres';
import { UUID } from 'crypto';
import { unstable_noStore } from 'next/cache';

export async function GET(
    request: Request,
    {params}:{params:{IdTayangan:UUID}}
) {
    try {
        unstable_noStore()
        console.log('params:', params);
        let query;
        query = await sql`
        SELECT t.judul AS judul_series, e.*
        FROM tayangan t
        JOIN episode e ON t.id = e.id_series
        WHERE t.id = ${params.IdTayangan};
        `;
        const { rows: episode_info } = await query;
        return Response.json(episode_info, { status: 200 });
    } catch (error) {
        console.error('Error fetching film information:', error);
        return Response.json({ message: 'Server error' }, { status: 500 });
    }
}

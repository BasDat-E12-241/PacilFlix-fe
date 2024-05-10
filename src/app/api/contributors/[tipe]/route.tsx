import { sql } from '@vercel/postgres';
import { useParams } from 'next/navigation';

export async function GET(
  request: Request,
  {params} : {params: {tipe:string}}
) {

  // console.log("Query parameters:", params.tipe); 
  const tipe = params.tipe;

  try {
    let query;
    if(tipe === 'all'){
      query = await sql`
        SELECT c.nama, 
          CASE 
            WHEN p.id IS NOT NULL THEN 'Pemain'
            WHEN S.id IS NOT NULL THEN 'Sutradara'
            WHEN PS.id IS NOT NULL THEN 'Penulis_skenario'
          END AS tipe,
          c.jenis_kelamin,c.kewarganegaraan
        from contributors as c
        left join pemain p on c.id = p.id
        left join sutradara s on c.id = s.id
        left join penulis_skenario ps on c.id = ps.id
        `;
    }
    else if(tipe === 'pemain'){
      query = await sql`
        SELECT c.nama, 'Pemain' as tipe,
          c.jenis_kelamin,c.kewarganegaraan
        from contributors as c
        join pemain p on c.id = p.id
        `;
    }
    else if(tipe === 'sutradara'){
      query = await sql`
        SELECT c.nama, 'Sutradara' as tipe,
          c.jenis_kelamin,c.kewarganegaraan
        from contributors as c
        join sutradara s on c.id = s.id
        `;
    }
    else if(tipe === 'penulis_skenario'){
      query = await sql`
        SELECT c.nama, 'Penulis Skenario' as tipe,
          c.jenis_kelamin,c.kewarganegaraan
        from contributors as c
        join penulis_skenario p on c.id = p.id
        `;
    }
    const { rows: contributors } = await query;
    return Response.json(contributors, { status: 200 });
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
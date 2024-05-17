import { sql } from "@vercel/postgres";

export default async function Cart({

} : {
  params: { user: string }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from pengguna`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.username} - {row.password}
        </div>
      ))}
    </div>
  );
}


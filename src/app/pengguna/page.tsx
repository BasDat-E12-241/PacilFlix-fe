import { sql } from "@vercel/postgres";

export default async function Cart({
  params
} : {
  params: { user: string }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from pacilflix.pengguna`;

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
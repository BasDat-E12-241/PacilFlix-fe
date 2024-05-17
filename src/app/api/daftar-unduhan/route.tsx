// pages/api/downloads.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const { rows } = await sql`
      SELECT t.judul AS judul, td.timestamp AS waktu_unduh
      FROM tayangan_terunduh td
      JOIN tayangan t ON td.id_tayangan = t.id
      WHERE td.username = ${username}
      ORDER BY td.timestamp DESC;
    `;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching download list:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

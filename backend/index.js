// backend/index.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5000;



// Configura o PostgreSQL
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'database',
  database: process.env.POSTGRES_DB || 'mydatabase',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: 5432,
});

app.get('/api', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.json({ message: `Current time from DB: ${result.rows[0].now}` });
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});


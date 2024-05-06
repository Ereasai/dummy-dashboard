const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.setHeader(
	  "Access-Control-Allow-Headers",
	  "Content-Type, Access-Control-Allow-Headers"
	);
	next();
});

console.log({user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT})

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.get('/values', async (req, res) => {
  console.log("got a get request.")
  try {
    const result = await pool.query('SELECT * FROM value_logs ORDER BY created_at DESC LIMIT 30');
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
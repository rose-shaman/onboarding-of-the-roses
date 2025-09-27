import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

// TODO: Replace with your actual NeonDB connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "<YOUR_NEONDB_CONNECTION_STRING>"
});

const app = express();
app.use(cors());
app.use(express.json());

// Get all events
app.get("/events", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.events ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new event
app.post("/events", async (req, res) => {
  const { name, date, description } = req.body;
  if (!name || !date) {
    return res.status(400).json({ error: "Name and date are required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO public.events (name, date, description) VALUES ($1, $2, $3) RETURNING *",
      [name, date, description || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

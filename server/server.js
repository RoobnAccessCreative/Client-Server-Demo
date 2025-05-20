import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

app.listen(8080, () => {
  console.log("Welcome to port 8080");
});

app.get("/", (req, res) => {
  res.json({ message: "You've found me.. >:(" });
});

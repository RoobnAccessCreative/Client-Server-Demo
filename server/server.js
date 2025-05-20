import express from "express";
import cors from "cors";
// ———————TUESDAY——————————
import dotenv from "dotenv";
import pg from "pg";
// ————————————————————————

const app = express();
app.use(express.json());
// for connecting w client dw
app.use(cors());

app.listen(8080, () => {
  console.log("Welcome to port 8080");
});

app.get("/", (req, res) => {
  res.json({ message: "You've found me.. >:(" });
});

app.post("/sending", (req, res) => {
  const userSent = req.body;
  res.send(`That's a wonderful ${userSent} you've got there..`);
});

// ———————TUESDAY———————————————————————————————————————————————————

// using pg to link to db.
// using dotenv to store secrets
// —> secrets are important/sensitive info that needs to be hidden
// —> i.e. db pword and conn string

// config dotenv to init .env
dotenv.config();

// create a pool w the conn string
// —> pool = like a waiting room for requests to db.
const db = new pg.Pool({
  // have to process data in our .env file to get access to its variables
  // —> process object has a lot of info abt the module — BUNCH of metadata u can log it if u want.
  // —> dotenv needed for process obj.
  connectionString: process.env.DB_CONN_STRING,
});

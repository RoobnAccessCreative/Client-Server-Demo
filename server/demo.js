import express from "express";
import cors from "cors";
// —————— TUESDAY —————————
import dotenv from "dotenv";
import pg from "pg";
// ————————————————————————

const app = express();
app.use(express.json());
// for connecting w client dw
app.use(cors());

app.listen(5000, () => {
  console.log("Welcome to port 5000");
});

app.get("/", (req, res) => {
  res.json({ message: "You've found me.. >:(" });
});

app.post("/sending", (req, res) => {
  const userSent = req.body;
  res.send(`That's a wonderful ${userSent} you've got there..`);
});

// —————— TUESDAY ——————————————————————————————————————————————————

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

// zwei methods
// —> .get = read data from db
app.get("/staff", async (req, res) => {
  const query = await db.query(`SELECT * FROM staff`);
  // parse data and wrangled it to j get rows property
  const recievedData = res.json(query.rows);
});
// —> .post = create data in db
app.post("/add", (req, res) => {
  // obj w our new data = body — in req
  const body = req.body;
  const query = db.query(
    // parameters use [$] and r numbered here — not [?]
    `INSERT INTO staff (staffName, staffRole) VALUES($1, $2)`,
    [body.staffName, body.staffRole]
  );
  const data = res.json(query);
});

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
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

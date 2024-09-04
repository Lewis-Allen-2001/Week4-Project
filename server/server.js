import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

//server setup
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

//connecting to the database
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

//get and post endpoint
app.get("/", function (request, response) {
  response.json("WOOO HOME ROUTE YIPPE!!");
});

//making a query to the database
app.get("/messageboard", async function (request, response) {
  const messageboard = await db.query("SELECT * FROM messageboard");
  response.json(messageboard.rows);
});

app.post("/messageboard", async function (request, response) {
  const username = request.body.username;
  const message = request.body.message;
  const newMessage = await db.query(
    "INSERT INTO messageboard (username, message) VALUES ($1,$2)",
    [username, message]
  );
  response.json(newMessage);
});

//server start
app.listen(5432, function () {
  console.log("App running on port 5432");
});

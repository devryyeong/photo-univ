import express, { Express, Request, Response } from "express";

const mongoose = require("mongoose");
const path = require("path");
const app: Express = express();
const port = 4000;
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("연결완료");
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + Express Server");
});

// 정적 파일을 가져오기 위한 미들웨어
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
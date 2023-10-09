import express, { Express, Request, Response } from "express";

const path = require("path");
const app: Express = express();
const port = 4000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + Express Server");
});

// 정적 파일을 가져오기 위한 미들웨어
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
import express, { Express, NextFunction, Request, Response } from "express";

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
    console.log("연결 완료");
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });

app.post("/", (req: Request, res: Response) => {
  console.log("req.body: ", req.body); 
  res.json(req.body);
});
  
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  setImmediate(() => {
    next(new Error("it is an error"));
  });
  // res.send("Typescript + Node.js + Express Server");
});

app.use("/users", require("./routes/users"));

// Express 에러 처리
app.use((error: any, res: Response) => {
  res.status(error.status || 500);
  res.send(error.message || "Oops, something went wrong.");
});

// 정적 파일을 가져오기 위한 미들웨어
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
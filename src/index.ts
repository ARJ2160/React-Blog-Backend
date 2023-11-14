//jshint esversion:6
//DEFINE BOILERPLATE
import express, { json, Express } from "express";
import { connect, set } from "mongoose";
import cors from "cors";
import Router from "./routes/routes.js";
import * as dotenv from "dotenv";
dotenv.config();

const app: Express = express();

//CONNECTING TO DATABASE
set("strictQuery", false);
connect(
  process.env.MONGODB_CONNECTION_STRING as string,
)
  .then(() => {
    console.log("Successfully Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const environment = process.env.NODE_ENV;
// const origin =
//   environment === "development"
//     ? "http://localhost/3000"
//     : "https://react-blog-backend-sigma.vercel.app/";

//APP CONFIG
// app.use(cors({ origin: 'https://blog-v2-olive.vercel.app' }));
app.use(cors());

app.use(json({ limit: "5mb" }));
app.use("/", Router);

//DEFINES THE PORT FOR THE APP TO LISTEN TO
const port = process.env.PORT || 9000;

//APP LISTENS TO PORT
app.listen(port, () => {
  console.log(">>", environment);
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
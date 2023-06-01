import { ConnectOptions } from "mongoose";
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
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions
)
  .then(() => {
    console.log("Successfully Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

//APP CONFIG
app.use(cors());
app.use(json({ limit: "5mb" }));
app.use("/", Router);

//DEFINES THE PORT FOR THE APP TO LISTEN TO
const port = 9000;

//APP LISTENS TO PORT
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

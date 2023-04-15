//jshint esversion:6
//DEFINE BOILERPLATE
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import Router from "./routes.js";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();

//CONNECTING TO DATABASE
connect(
    `mongodb+srv://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASSWORD}@blog-cluster.jgv4u.mongodb.net/${process.env.REACT_APP_DB_NAME}?retryWrites=true&w=majority&ssl=true`,
    { useNewUrlParser: true, useUnifiedTopology: true }
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
const port = 9000

//APP LISTENS TO PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//jshint esversion:6
//DEFINE BOILERPLATE
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./routes");
const app = express();
require("dotenv").config();

//CONNECTING TO DATABASE
mongoose
  .connect(
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
app.use(express.json({ limit: "5mb" }));
app.use("/", Router);

//DEFINES THE PORT FOR THE APP TO LISTEN TO
let port = process.env.PORT;
if (port === null || port === "") {
  port = "5000";
}

//APP LISTENS TO PORT
app.listen(port, () => {
  if (port === "5000") {
    console.log("Server running on port 5000");
  } else {
    console.log(`Server running on ${port}`);
  }
});

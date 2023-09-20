const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/api/v1", routes);

mongoose
  .connect(
    "mongodb+srv://karthik2manthitta:8OC9gSscCbj5L0KW@cluster0.2igbz24.mongodb.net/"
  )
  .then((res) => {
    console.log("db connected");
    const server = app.listen(8080);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((e) => console.log(e));

require("dotenv").config();

const { PORT = 3000 } = process.env;
const express = require("express");
const server = express();
const apiRouter = require("./api");

const morgan = require("morgan");

server.use(morgan("dev"));


const { client } = require("./db");
client.connect();

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.use("/api", apiRouter);

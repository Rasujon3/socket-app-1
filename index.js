const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
const port = 3000;

const { Server } = require("socket.io");
const io = new Server(expressServer);

let buyNsp = io.of("/buy");
buyNsp.on("connection", function (socket) {
  buyNsp.emit("MyEvent", "hello buy");
});

let sellNsp = io.of("/sell");
sellNsp.on("connection", function (socket) {
  sellNsp.emit("MyEvent", "hello sell");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

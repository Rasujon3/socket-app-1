const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
const port = 3000;

const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", function (socket) {
  socket.join("kitchen-room");
  let sizeOfKitchen = io.sockets.adapter.rooms.get("kitchen-room").size;
  io.sockets
    .in("kitchen-room")
    .emit("cooking", "Fried rice cooking. " + sizeOfKitchen);
  io.sockets.in("kitchen-room").emit("boiling", "Boiling water.");

  socket.join("bed-room");
  io.sockets.in("bed-room").emit("sleep", "I am sleeping...");
  io.sockets.in("bed-room").emit("rest", "I am taking rest.");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

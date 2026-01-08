const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
const port = 3000;

const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", function (socket) {
  console.log("New User Connected.");
  socket.on("MyEvent", function (msg) {
    console.log(msg);
  });

  //   setInterval(function () {
  //     let d = new Date();
  //     let t = d.getTime();
  //     socket.emit("myEvent", t);
  //   }, 10);

  //   socket.on("disconnect", function () {
  //     console.log("User Disconnected.");
  //   });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

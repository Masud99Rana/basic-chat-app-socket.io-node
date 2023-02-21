const express = require("express");
const http = require("http");
// const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();

// create server through http
const httpServer = http.createServer(app);

// create socket server based on httpServer
const io = new Server(httpServer, { /* options */ });



app.get("/", (req, res) => {
  // res.json({ data: "hello world from socket" });
  res.sendFile(__dirname + "/client/index.html");
});



//io.on() Listen

//io.emit() speak
/* io.on("connection", (socket) => {
    console.log("Client Connected ",socket.id)
}); */

io.of("/admin").on("connection", (socket) => {
  console.log('Admin Connected ',socket.id);
  socket.on('adminEvent',(payload)=>{
      console.log('Payload',payload);
  });
});

io.of("/teacher").on("connection", (socket) => {
  console.log('Teacher Connected ',socket.id);
});

io.of("/student").on("connection", (socket) => {
  console.log('Student Connected ',socket.id);
  socket.on('studentEvent',(payload)=>{
      console.log('Payload',payload);
  });
});

const PORT =  process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
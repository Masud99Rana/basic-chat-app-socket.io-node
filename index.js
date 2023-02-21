const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const PORT = 4000;

// create server through http
const httpServer = http.createServer(app);

// create socket server based on httpServer
const io = new Server(httpServer);

app.get("/", (req, res) => {
  // res.json({ data: "hello world from socket" });
  res.sendFile(__dirname + "/client/index.html");
});



// io.on(eventName, cbfn); // on => listen

// on => Listening, emit => Speaking
io.on("connection", (socket) => {
  console.log("Connection is ready", socket.id);

  socket.on("disconnect", () =>{
    console.log("Disconnected!", socket.id);
  });

  socket.on('clientEvent', (payload) => {
    console.log("Msg->", payload);

    socket.emit('serverEvent', payload); // Speak to socket
    // io.emit('serverEvent', payload); // Speak to all
  })

});


httpServer.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
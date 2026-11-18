import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const ROOM = "Got User";

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("joinRoom", async (userName) => {
    console.log(`${userName} joined the group.`);

    await socket.join(ROOM);

    // send to all
    // io.to(ROOM).emit('roomNotice', userName);

    // broadcast (baaki sabhi users ko notify karega)
    socket.to(ROOM).emit("roomNotice", userName);
  });

  socket.on("chatMessage", (msg) => {
    // message ko poore room me broadcast karna
    io.to(ROOM).emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`server running at port ${process.env.PORT || 8000}`);
});

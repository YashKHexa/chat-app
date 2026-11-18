import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { Server } from "socket.io";

const PORT = Number(process.env.PORT) || 8000;
const ROOM = "group-chat";
const MAX_NAME_LENGTH = 50;
const MAX_TEXT_LENGTH = 2000;

const log = (level, msg, meta = {}) =>
  console[level](
    `[${new Date().toISOString()}] ${level.toUpperCase()} ${msg} ${JSON.stringify(meta)}`,
  );

const clean = (value, max) =>
  typeof value === "string" && value.trim() && value.trim().length <= max
    ? value.trim()
    : null;

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });

// socket.id -> { id, name }
const users = new Map();

io.on("connection", (socket) => {
  log("info", "socket connected", { socketId: socket.id });

  socket.on("joinRoom", async (userName) => {
    const name = clean(userName, MAX_NAME_LENGTH);
    if (!name) {
      return log("warn", "joinRoom rejected: invalid name", {
        socketId: socket.id,
      });
    }

    const user = { id: socket.id, name };
    users.set(socket.id, user);
    await socket.join(ROOM);

    socket.emit(
      "onlineUsers",
      [...users.values()].filter((u) => u.id !== socket.id),
    );
    socket.to(ROOM).emit("userJoined", user);
    log("info", "user joined", { userId: user.id, name, online: users.size });
  });

  socket.on("chatMessage", (text) => {
    const user = users.get(socket.id);
    if (!user) {
      return log("warn", "chatMessage rejected: not joined", {
        socketId: socket.id,
      });
    }

    const cleanText = clean(text, MAX_TEXT_LENGTH);
    if (!cleanText) {
      return log("warn", "chatMessage rejected: invalid text", {
        userId: user.id,
      });
    }

    const message = {
      id: randomUUID(),
      senderId: user.id,
      senderName: user.name,
      text: cleanText,
      createdAt: new Date().toISOString(),
    };

    io.to(ROOM).emit("chatMessage", message);
    log("info", "message sent", { messageId: message.id, userId: user.id });
  });

  socket.on("disconnect", (reason) => {
    const user = users.get(socket.id);
    users.delete(socket.id);
    if (user) io.to(ROOM).emit("userLeft", user.id);
    log("info", "socket disconnected", {
      socketId: socket.id,
      userId: user?.id,
      reason,
      online: users.size,
    });
  });
});

server.listen(PORT, () => log("info", "server listening", { port: PORT }));

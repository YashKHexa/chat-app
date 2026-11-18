import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOM = "Got User"

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('joinRoom', async (userName) => {
    console.log(`${userName} is joining the group.`);

    await socket.join(ROOM);

    // send to all
    // io.to(ROOM).emit('roomNotice', userName);

    // broadcast (baaki sabhi users ko notify karega)
    socket.to(ROOM).emit('roomNotice', userName);
  });

  socket.on('chatMessage', (msg) => {
    // message ko poore room me broadcast karna
    io.to(ROOM).emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});



app.get('/', (req, res) => {
  res.send('<h1>saumya from ahm</h1>');
});


server.listen(6969, () => {
  console.log('server running at http://localhost:6969');
});
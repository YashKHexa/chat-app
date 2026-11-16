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

app.get('/', (req, res) => {
  res.send('<h1>saumya from ahm</h1>');
});


const ROOM = "Got User"
io.on('connection', (socket) => {
  console.log('A user connected in our Chat-App', socket.id);

  socket.on('joinroom', async (username) => {
    console.log(`${username} is joining the chat.`)
    await socket.join(ROOM)
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

server.listen(6969, () => {
  console.log('server running at http://localhost:6969');
});
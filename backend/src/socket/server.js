import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.send('<h1>nigga</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
});



server.listen(6969, () => {
  console.log('server running at http://localhost:6969');
});
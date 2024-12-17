import express from 'express';
import { createServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN && client != ws) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log('Client connected');
  ws.send('Hello! Message From Server!!');
});

server.listen(8080, () => {
  console.log(new Date() + ' Server is listening on port 8080');
});

const http = require('http');
const WebSocket = require('ws');
const WebSocketHandler = require('./websocket/websocketHandler');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  const websocketHandler = new WebSocketHandler(ws);

  ws.on('message', (message) => {
    websocketHandler.handleMessage(message);
  });

  ws.on('close', () => {
    websocketHandler.handleClose();
  });

  ws.on('error', (error) => {
    websocketHandler.handleError(error);
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
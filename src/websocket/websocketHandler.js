const WebSocket = require('ws');
const { streamText, streamFile } = require('../stream');

class WebSocketHandler {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });

    this.wss.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(ws) {
    ws.on('message', this.handleMessage.bind(this, ws));
    ws.on('close', this.handleClose.bind(this, ws));
    ws.on('error', this.handleError.bind(this, ws));
  }

  handleMessage(ws, message) {
    const { type, payload } = JSON.parse(message);

    switch (type) {
      case 'text':
        streamText(ws, payload);
        break;
      case 'file':
        streamFile(ws, payload);
        break;
      default:
        ws.send(JSON.stringify({ type: 'error', payload: 'Invalid message type' }));
    }
  }

  handleClose(ws) {
    console.log('WebSocket connection closed');
  }

  handleError(ws, error) {
    console.error('WebSocket error:', error);
  }
}

module.exports = WebSocketHandler;
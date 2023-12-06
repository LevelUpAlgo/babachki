const chai = require('chai');
const sinon = require('sinon');
const WebSocket = require('ws');
const WebSocketHandler = require('../../src/websocket/websocketHandler');

const { expect } = chai;

describe('WebSocketHandler', () => {
  let wsHandler;
  let ws;

  beforeEach(() => {
    ws = new WebSocket('ws://localhost:8080');
    wsHandler = new WebSocketHandler(ws);
  });

  afterEach(() => {
    ws.close();
  });

  describe('handleConnection', () => {
    it('should send a welcome message when a new connection is established', () => {
      const sendSpy = sinon.spy(ws, 'send');
      wsHandler.handleConnection();

      expect(sendSpy.calledOnce).to.be.true;
      expect(sendSpy.calledWith('Welcome to the WebSocket server!')).to.be.true;
    });
  });

  describe('handleMessage', () => {
    it('should handle text messages correctly', () => {
      const message = JSON.stringify({ type: 'text', content: 'Hello, world!' });
      const streamTextSpy = sinon.spy(wsHandler, 'streamText');

      wsHandler.handleMessage(message);

      expect(streamTextSpy.calledOnce).to.be.true;
      expect(streamTextSpy.calledWith('Hello, world!')).to.be.true;
    });

    it('should handle file messages correctly', () => {
      const message = JSON.stringify({ type: 'file', content: 'path/to/file' });
      const streamFileSpy = sinon.spy(wsHandler, 'streamFile');

      wsHandler.handleMessage(message);

      expect(streamFileSpy.calledOnce).to.be.true;
      expect(streamFileSpy.calledWith('path/to/file')).to.be.true;
    });
  });

  describe('handleClose', () => {
    it('should log a message when the connection is closed', () => {
      const consoleLogSpy = sinon.spy(console, 'log');

      wsHandler.handleClose();

      expect(consoleLogSpy.calledOnce).to.be.true;
      expect(consoleLogSpy.calledWith('Connection closed')).to.be.true;

      consoleLogSpy.restore();
    });
  });

  describe('handleError', () => {
    it('should log an error message when an error occurs', () => {
      const consoleErrorSpy = sinon.spy(console, 'error');
      const error = new Error('Test error');

      wsHandler.handleError(error);

      expect(consoleErrorSpy.calledOnce).to.be.true;
      expect(consoleErrorSpy.calledWith('WebSocket error: ', error)).to.be.true;

      consoleErrorSpy.restore();
    });
  });
});
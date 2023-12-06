const fs = require('fs');
const WebSocket = require('ws');
const { streamText } = require('../../src/stream/textStream');

describe('streamText', () => {
  let server;
  let client;

  beforeAll((done) => {
    server = new WebSocket.Server({ port: 8080 }, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach((done) => {
    client = new WebSocket('ws://localhost:8080');
    client.on('open', done);
  });

  afterEach((done) => {
    client.close(done);
  });

  it('should stream text to a WebSocket connection', (done) => {
    const text = 'Hello, World!';
    const readStream = fs.createReadStream('./test.txt');
    readStream.write(text);
    readStream.end();

    client.on('message', (data) => {
      expect(data).toBe(text);
      done();
    });

    server.on('connection', (ws) => {
      streamText(readStream, ws);
    });
  });

  it('should handle errors', (done) => {
    const readStream = fs.createReadStream('./nonexistent.txt');

    client.on('message', (data) => {
      expect(data).toBe('Error: ENOENT: no such file or directory, open \'./nonexistent.txt\'');
      done();
    });

    server.on('connection', (ws) => {
      streamText(readStream, ws);
    });
  });
});
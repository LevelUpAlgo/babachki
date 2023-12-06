const request = require('supertest');
const http = require('http');
const WebSocket = require('ws');
const app = require('../src/server');

describe('HTTP Server', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen();
  });

  afterAll((done) => {
    server.close(done);
  });

  test('should respond with a 200 for GET requests to the root', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('WebSocket Server', () => {
  let server;
  let client;

  beforeAll(() => {
    server = new WebSocket.Server({ port: 8080 });
    client = new WebSocket(`ws://localhost:8080`);
  });

  afterAll((done) => {
    server.close();
    client.close();
    done();
  });

  test('should open a WebSocket connection', (done) => {
    client.on('open', () => {
      done();
    });
  });

  test('should receive messages from the WebSocket server', (done) => {
    client.on('message', (data) => {
      expect(data).toBeTruthy();
      done();
    });

    client.send('Hello Server!');
  });
});
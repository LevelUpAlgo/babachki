const fs = require('fs');
const WebSocket = require('ws');
const streamFile = require('../../src/stream/fileStream');

jest.mock('fs');
jest.mock('ws');

describe('streamFile', () => {
  let ws;
  let readStream;

  beforeEach(() => {
    ws = new WebSocket();
    readStream = fs.createReadStream();

    ws.send = jest.fn();
    readStream.on = jest.fn((event, callback) => {
      if (event === 'data') {
        callback('file data');
      } else if (event === 'end') {
        callback();
      }
    });
    fs.createReadStream.mockReturnValue(readStream);
  });

  it('should create a read stream from the file', async () => {
    await streamFile(ws, 'file.txt');
    expect(fs.createReadStream).toHaveBeenCalledWith('file.txt');
  });

  it('should send the file data to the client', async () => {
    await streamFile(ws, 'file.txt');
    expect(ws.send).toHaveBeenCalledWith('file data');
  });

  it('should handle errors', async () => {
    readStream.on.mockImplementation((event, callback) => {
      if (event === 'error') {
        callback(new Error('file error'));
      }
    });
    await expect(streamFile(ws, 'file.txt')).rejects.toThrow('file error');
  });
});
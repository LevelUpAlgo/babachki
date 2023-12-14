const fs = require('fs');
const util = require('util');

/**
 * Stream text data to a WebSocket connection.
 * @param {string} filePath - The path of the text file to stream.
 * @param {WebSocket} ws - The WebSocket connection to stream the data to.
 */
async function streamText(filePath, ws) {
  // Create a readable stream from the text file.
  const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

  // When data is available, send it to the WebSocket connection.
  stream.on('data', (chunk) => {
    ws.send(chunk);
  });

  // If an error occurs while reading the file, close the WebSocket connection.
  stream.on('error', (err) => {
    console.error(`An error occurred while reading the file: ${err.message}`);
    ws.close();
  });

  // When the end of the file is reached, close the WebSocket connection.
  stream.on('end', () => {
    ws.close();
  });

  // Wrap the stream's `close` event in a promise.
  const streamClosed = util.promisify(stream.on).bind(stream)('close');

  // Wait for the stream to close or for the WebSocket connection to close
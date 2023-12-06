const fs = require('fs');

/**
 * Stream a file to a WebSocket connection.
 * @param {string} filePath - The path of the file to stream.
 * @param {WebSocket} ws - The WebSocket connection to stream the file to.
 */
function streamFile(filePath, ws) {
  // Create a read stream for the file
  const readStream = fs.createReadStream(filePath);

  // When data is available, send it to the WebSocket connection
  readStream.on('data', (chunk) => {
    ws.send(chunk);
  });

  // If an error occurs while reading the file, close the WebSocket connection
  readStream.on('error', (err) => {
    console.error(`An error occurred while reading the file: ${err.message}`);
    ws.close();
  });

  // When the end of the file is reached, close the WebSocket connection
  readStream.on('end', () => {
    ws.close();
  });
}

module.exports = streamFile;
const fs = require('fs');

// Function to parse a WebSocket message
function parseMessage(message) {
  try {
    return JSON.parse(message);
  } catch (error) {
    console.error(`Error parsing message: ${error}`);
  }
}

// Function to format a message to be sent over WebSocket
function formatMessage(data) {
  return JSON.stringify(data);
}

// Function to handle errors
function handleError(error) {
  console.error(`Error: ${error}`);
}

// Function to check if a file exists
function fileExists(path) {
  return fs.existsSync(path);
}

module.exports = {
  parseMessage,
  formatMessage,
  handleError,
  fileExists,
};
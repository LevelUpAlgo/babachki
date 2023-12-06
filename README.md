# My WebSocket Server

This project is a Node.js server for streaming text and files using WebSockets.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

Before you start, make sure you have Node.js and npm installed on your machine.

To install the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/my-websocket-server.git
```

2. Navigate to the project directory:

```bash
cd my-websocket-server
```

3. Install the dependencies:

```bash
npm install
```

## Usage

To start the server, run the following command:

```bash
npm start
```

The server listens on port 8080 and accepts WebSocket connections.

To stream a text, send a WebSocket message in the following format:

```json
{
  "type": "text",
  "data": "path/to/text/file.txt"
}
```

To stream a file, send a WebSocket message in the following format:

```json
{
  "type": "file",
  "data": "path/to/file"
}
```

The server reads the file and sends it to the client in chunks.

## Testing

To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome. Please, fork the repository and create a pull request.

## License

This project is licensed under the MIT License.
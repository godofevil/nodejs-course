const http = require('http');
const { APP_PORT, ENV } = require('./config.js');
const logger = require('./logger');

const server = http.createServer((incomingMessage, response) => {
    response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8" });
    response.end('Hello, world');
});

server.listen(APP_PORT, "127.0.0.1", () => {
    logger.log(`Server is listening on port ${APP_PORT}. Env is ${ENV}.`);
});

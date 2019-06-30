const server = require('./server'); 
const client = require('./client');

server.init();
client.sendMultipleRequests(10);
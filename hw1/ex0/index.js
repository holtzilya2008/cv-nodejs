const server = require('./server'); 
const client = require('./client');
const constants = require('../shared/constants');

server.init();
client.sendMultipleRequests(constants.requestsNumber);
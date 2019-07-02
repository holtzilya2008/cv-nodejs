const server = require('./server'); 
const client = require('../shared/client');
const constants = require('../shared/constants');

server.init();
client.sendMultipleRequests(constants.requestsNumber);
const http = require('http');
const infrastructure = require('../shared/infrastructure');
const constants = require('../shared/constants');

const startServer = function() {
    console.log('Starting http server on port ' + constants.port);

    http.Server((request, response) => {
        console.log(`Received request `);
        infrastructure.sleep(constants.requestDelayMS);
        response.writeHead(200);
        response.end('Great success!');
    }).listen(constants.port);
}

module.exports = {
    init: startServer
}
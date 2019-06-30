const http = require('http');
const infrastructure = require('../shared/infrastructure');

const startServer = function() {
    const port = 8001;  
    const delayMS = 1000;
    console.log('Starting http server on port ' + port);

    http.Server((request, response) => {
        console.log(`Received request `);
        response.writeHead(200);
        infrastructure.sleep(delayMS);
        response.end('Great success!');
    }).listen(port);
}

module.exports = {
    init: startServer
}
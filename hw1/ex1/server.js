const http = require('http');

function startServer() {
    const port = 8001;
    console.log('Starting http server on port ' + port);

    http.Server((request, response) => {
        console.log(`Received request `)
        response.writeHead(200);
        response.end('Hello World');
    }).listen(port);
}

module.exports = {
    init: startServer
}
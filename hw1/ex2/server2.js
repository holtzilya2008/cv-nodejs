const http = require('http');
const infrastructure = require('../shared/infrastructure');
const cluster = require('cluster');
const constants = require('../shared/constants');

const startServer = function() {
    if (cluster.isMaster) {
        // Keep track of http requests
        let numReqs = 0;
        setInterval(() => {
        console.log(`numReqs = ${numReqs}`);
        }, 1000);
    
        // Count requests
        function messageHandler(msg) {
        if (msg.cmd && msg.cmd === 'notifyRequest') {
            numReqs += 1;
        }
        }
        // Start workers and listen for messages containing notifyRequest
        const numCPUs = require('os').cpus().length;
        for (let i = 0; i < numCPUs; i++) {
        cluster.fork({workerId: i});
        }
        for (const id in cluster.workers) {
        cluster.workers[id].on('message', messageHandler);
        }

        console.log('[MASTER] Created ' + numCPUs + ' workers.');
    } else {
        // Worker processes have a http server.
        http.Server((req, res) => {
        console.log('[WORKER ' + process.env.workerId + '] request: ' + req.url);
    
        infrastructure.sleep(constants.requestDelayMS);
    
        res.writeHead(200);
        res.end('hello world\n');
    
        // Notify master about the request
        process.send({ cmd: 'notifyRequest' });
        }).listen(constants.port);
    }
}

module.exports = {
    init: startServer
}

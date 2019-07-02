const http = require('http');
const infrastructure = require('../shared/infrastructure');
const cluster = require('cluster');
const constants = require('../shared/constants');
const child_process = require('child_process');

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

        for (let i = 0; i < constants.workersNumber; i++) {
            cluster.fork({workerId: i});
        }
        for (const id in cluster.workers) {
            cluster.workers[id].on('message', messageHandler);
        }

        console.log('[MASTER] Created ' + constants.workersNumber + ' workers.');
    } else {
        // Worker processes have a http server.
        http.Server((req, res) => {
            console.log('[WORKER ' + process.env.workerId + '] request: ' + req.url);
            // Notify master about the request
            process.send({ cmd: 'notifyRequest' });
            
            const forked = child_process.fork(__dirname + '/'+ 'calcsum.js');
            forked.on('message', (data) => {
                if (data.errorMessage) {
                    console.log('An error Occured' + data.errorMessage);
                    res.writeHead(500);
                    res.end('error.message');
                } else {
                    console.log('The result is ' + data.result);
                    res.writeHead(200);
                    res.end('Great Success! Result : ' + data.result);
                }
            });
            infrastructure.sleep(constants.requestDelayMS);
            forked.send({ a: 2, b: 3 });

        }).listen(constants.port);
    }
}

startServer();
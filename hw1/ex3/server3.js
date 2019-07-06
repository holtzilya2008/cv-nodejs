const http = require('http');
const infrastructure = require('../shared/infrastructure');
const cluster = require('cluster');
const constants = require('../shared/constants');
const child_process = require('child_process');

const startServer = function() {
    if (cluster.isMaster) {
        infrastructure.startMasterRoutine(cluster);
    } else {
        http.Server((req, res) => {
            console.log('[WORKER ' + process.env.workerId + '] request: ' + req.url);
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
const http = require('http');
const infrastructure = require('../shared/infrastructure');
const cluster = require('cluster');
const constants = require('../shared/constants');

const startServer = function() {

    if (cluster.isMaster) {
        infrastructure.startMasterRoutine(cluster);
    } else {
        http.Server((req, res) => {
            console.log('[WORKER ' + process.env.workerId + '] request: ' + req.url);
            infrastructure.sleep(constants.requestDelayMS);
            res.writeHead(200);
            res.end('Great Success!\n');
            process.send({ cmd: 'notifyRequest' });
        }).listen(constants.port);
    }
}

startServer();

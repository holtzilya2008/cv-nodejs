const http = require('http');
const infrastructure = require('../shared/infrastructure');
const cluster = require('cluster');
const constants = require('../shared/constants');

const startServer = function() {

    if (cluster.isMaster) {

        let receivedRequests = 0;

        const logRequestsStatusEvery = function(period) {
            setInterval(() => {
                console.log(`receivedRequests = ${receivedRequests}`);
            }, period);
        }
    
        const increaseRequestCounter = function(message) {
            if (message.cmd && message.cmd === 'notifyRequest') {
                receivedRequests += 1;
            }
        }
    
        const startWorkers = function() {
            for (let i = 0; i < constants.workersNumber; i++) {
                cluster.fork({workerId: i});
            }
            for (const id in cluster.workers) {
                cluster.workers[id].on('message', increaseRequestCounter);
            }
            console.log('[MASTER] Created ' + constants.workersNumber + ' workers.');
        };

        logRequestsStatusEvery(constants.loggingPeriodMS);
        startWorkers();

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

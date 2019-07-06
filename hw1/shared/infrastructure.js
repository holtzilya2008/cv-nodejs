const constants = require('./constants');

const sleep = function(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

const startMasterRoutine = function(cluster) {
    
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
};

module.exports = {
    sleep: sleep,
    startMasterRoutine: startMasterRoutine
}
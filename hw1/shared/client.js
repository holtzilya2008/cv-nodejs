
const http = require('http');

const sendRequest = function() {
    console.log('Client - sending request');
    http.get('http://localhost:8001/hello', response => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            console.log('Response completed: ' + data);
        });
    });
}

const sendMultipleRequests = function(numberOfRequests) {
    if (!numberOfRequests || isNaN(numberOfRequests) || numberOfRequests < 0){
        throw new Error('sendMultipleRequests: numberOfRequests should be a positive number');
    }
    for (i = 0; i < numberOfRequests; i++) {
        sendRequest();
    }
}

module.exports = {
    sendMultipleRequests: sendMultipleRequests
}
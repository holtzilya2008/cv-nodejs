
const calcSum = function(a, b) {
    return a + b;
}

process.on('message', (args) => {
    if (!args || !args.hasOwnProperty('a') || !args.hasOwnProperty('b')) {
        process.send({ errorMessage: 'one or more of the arguments are invalid' })
    }
    console.log('Received arguments : a = ' + args.a + ' b = ' + args.b );
    console.log('calculating...');
    process.send({ result: calcSum(args.a, args.b)});
    process.kill(process.pid);
});

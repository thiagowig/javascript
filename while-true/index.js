#!/usr/bin/env node

var program = require('commander')
var shelljs = require('shelljs')

process.setMaxListeners(5);

program
    .option('-c, --command <command>', 'Command to run (required)')
    .option('-i, --interval <interval>', 'Interval between executions, in seconds (required)', parseInt)
    .option('-d, --duration [duration]', 'Duration of iterations, in seconds (optional)', parseInt)
    .parse(process.argv)

if (!(typeof program.command === 'string' || typeof program.command === 'stringValue')) {
    generateError('Invalid command argument. Usage: c, --command <command>')

} else if (!program.interval || isNaN(program.interval)) {
    generateError('Invalid interval argument. Usage: -i, --interval <interval>')

} else if (program.duration && isNaN(program.duration)) {
    generateError('Invalid duration argument. Usage: -d, --duration [duration]')
}

var initialTimeStamp = getCurrentTimeStamp()

var reRun = function () {
    if (!program.duration) {
        return true
    } else {
        var currentTimeStamp = getCurrentTimeStamp()
        var maxTimeStamp = initialTimeStamp + program.duration

        return currentTimeStamp < maxTimeStamp
    }
}

var executeCommand = function () {
    console.log('Executing: ' + new Date())

    shelljs.exec(program.command, { silent: false }, function (err, stdOut, stdErr) {
        if (err || !reRun()) {
            process.exit()
        } else {}
    })
}

function getCurrentTimeStamp() {
    return Math.floor(Date.now() / 1000)
}

function generateError(message) {
    console.log(message)
    process.exit()
}


setInterval(function () {
    executeCommand();
}, program.interval * 1000);

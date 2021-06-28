const { performance } = require('perf_hooks');
const moment = require('moment');
const { writeLog } = require('../startup/logging')
const config = require('config');



/**
 * @param  {object} req - request object
 * @return 
 */
function entry(req){

    req.tracing = [];
    req.lastProcessedTime = performance.now();
    req.tracing.push({'entry':0});

    /** Console tracing entry */
    if(config.get('TRACING_LOG') == 1 || config.get('TRACING_LOG') == 3){
        console.log(`[${moment().format()}] - URL=> ${req.originalUrl} - Method=> ${req.method}`);
        console.log(`Entry - `,0,'ms');
    }
}



/**
 * @param  {object} req - request object
 * @return 
 */
function exit(req){

    /** Make entry only once using tracingExit flag */
    if(!req.tracingExit){
        req.tracingExit = true;
        let time = Math.ceil(performance.now() - req.lastProcessedTime);
        req.tracing.push({'exit':time});
        req.lastProcessedTime = performance.now();

        /** Console Tracing exit */
        if(config.get('TRACING_LOG') == 1 || config.get('TRACING_LOG') == 3)
            console.log(`Exit - `,time,'ms');

        /** Log Tracing data */
        if(config.get('TRACING_LOG') >= 2){
            let path = config.get('TRACING_LOG_PATH') || '/var/log/tracing.log';
            
            let data = {
                timestamp : moment().format(),
                url: req.originalUrl,
                method: req.method,
                data: req.tracing
            };
            let log = JSON.stringify(data);
            
            writeLog(path, log);
        }
    }
}






module.exports = {
    entry,
    exit
}
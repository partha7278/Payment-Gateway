const { performance } = require('perf_hooks');
const moment = require('moment');
const { writeLog } = require('../startup/logging')
const config = require('config');
const path = require('path');
const basedir = path.dirname(require.main.filename);


/**
 * tracer entry function
 * @param  {Object} req - request object
 * @return 
 */
function entry(req){

    req.tracing = [];
    req.entryTime = performance.now();
    req.tracing.push({'entry':0});

    /** Console tracing entry */
    if(config.get('TRACING_LOG') == 1 || config.get('TRACING_LOG') == 3){
        console.log(`[${moment().format()}] - URL=> ${req.originalUrl} - Method=> ${req.method}`);
        console.log(`Entry - `,0,'ms');
    }
}



/**
 * tracer exit function
 * @param  {Object} req - request object
 * @return 
 */
function exit(req){

    /** Make entry only once using tracingExit flag */
    if(!req.tracingExit){
        req.tracingExit = true;
        let time = Math.ceil(performance.now() - req.entryTime);
        req.tracing.push({'exit':time});
        req.entryTime = performance.now();

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





/**
 * @param  {Object} req - required - request object
 * @param  {string} name - optional - trace name
 * @return
 */
function trace(req,name){
    //TODO we have to complete this function using errorStack
    let time = Math.ceil(performance.now() - req.entryTime);
    console.log('time ',time,' ms');
}


module.exports = {
    entry,
    exit,
    trace
}
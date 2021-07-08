const fs = require('fs');
const moment = require('moment');
const config = require('config');
const notification = require('../services/notification');


/**
 * Info logger function
 * @param  {string | Object} message - message can be string or object
 * @return 
 */
function info(message){

    if(typeof message == "object")
        message = JSON.stringify(message);

    let log = `[${moment().format()}] - ${message}`;
    console.log(log);

    let path = config.get('INFO_LOG_PATH') || '/var/log/info.log';
    if(config.get('LOGGING') >= 2)
        writeLog(path,log);
}


/**
 * Error logger function 
 * @param  {error} err - error data
 * @param  {Object} userData - user data object
 * @param  {Object} others - others data object
 * @return
 */
function error(err,userData={},others=''){

    let log = {
        timestamp : moment().format(),
        message : err.message ? err.message : '',
        errorType : err.name ? err.name : '',
        fileName : err.fileName ? err.fileName : '',
        lineNumber : err.lineNumber ? err.lineNumber : '',
        columnNumber : err.columnNumber ? err.columnNumber : '',
        userData : userData,
        othersData : (others ? others : (err.others ? err.others : {})),
        stack : err.stack ? err.stack : '',
    }

    console.log(log);

    /** Write log if enable */
    let path = config.get('ERROR_LOG_PATH') || '/var/log/error.log';
    if(config.get('LOGGING') >= 1)
        writeLog(path, JSON.stringify(log)+ "\r");
    

    /** send slack notification if enable */
    if(process.env.SLACK_WEBHOOK_URL)
        notification.slackNotification(JSON.stringify(log), 0);
}



/**
 * Log write in file
 * @param  {string} path - file path, to write log
 * @param  {Object} log - log 
 * @return 
 */
function writeLog(path,log){

    try{
        let content = log + "\n";
        fs.appendFile(path, content, err => {
            if(err) console.log(err);
        });
    }
    catch{
        console.log('Write Log Error - Unable to write log')
    }
}




module.exports = {
    info,
    error,
    writeLog
}
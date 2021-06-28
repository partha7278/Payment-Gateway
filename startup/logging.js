const fs = require('fs');
const moment = require('moment');
const config = require('config');

/**
 * Info logger function
 * @param  {string,object} message - message can be string or object
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
 * @param  {object} userData - user data object
 * @param  {object} others - others data object
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

    let path = config.get('ERROR_LOG_PATH') || '/var/log/error.log';
    if(config.get('LOGGING') >= 1)
        writeLog(path, JSON.stringify(log)+ "\r");

}



/**
 * Log write in file
 * @param  {string} path - file path, to write log
 * @param  {object} log - log 
 * @return 
 */
function writeLog(path,log){

    let content = log + "\n";
    fs.appendFile(path, content, err => {
        if(err) console.log(err);
    });
}




module.exports = {
    info,
    error,
    writeLog
}
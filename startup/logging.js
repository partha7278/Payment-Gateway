const fs = require('fs');
const moment = require('moment');


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

    if(process.env.LOGGING >= 2)
        writeLog(process.env.INFO_LOG_PATH,log);
}


/**
 * Error logger function 
 * @param  {error} err - error data
 * @param  {object} userData - user data object
 * @param  {object} others - others data object
 * @return
 */
function error(err,userData={},others={}){

    let log = {
        timestamp : moment().format(),
        message : err.message ? err.message : '',
        errorType : err.name ? err.name : '',
        fileName : err.fileName ? err.fileName : '',
        lineNumber : err.lineNumber ? err.lineNumber : '',
        columnNumber : err.columnNumber ? err.columnNumber : '',
        userData : userData,
        othersData : others,
        stack : err.stack ? err.stack : '',
    }

    console.log(log);

    if(process.env.LOGGING >= 1)
        writeLog(process.env.ERROR_LOG_PATH, JSON.stringify(log)+ "\r");

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
    error
}
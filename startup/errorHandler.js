

module.exports = function(req){

    process.on('unhandledRejection',(ex)=> { logger.error(ex,req); });
    process.on('uncaughtException', (ex)=> { logger.error(ex,req); });
} 
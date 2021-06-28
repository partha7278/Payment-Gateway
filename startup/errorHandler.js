

module.exports = function(){

    process.on('unhandledRejection',(ex)=> { logger.error(ex); });
    process.on('uncaughtException', (ex)=> { logger.error(ex); });
    process.on('rejectionHandled', (ex)=> { logger.error(ex); });
} 
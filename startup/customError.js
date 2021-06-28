

class CustomError extends Error {

    /**
     * Create custom error
     * @param  {string} errorType
     * @param  {string} message
     * @param  {object} others
     * @return 
     */
    constructor(errorType, message, others) {
        super(message);

       if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }

        this.name = errorType;
        this.others = {...others}
    }
}




/**
 * Handle error and return json
 * @param  {object} error - error object
 * @return 
 */
function handleError(error, user={}){
    logger.error(error, user);

    return {'statusCode':500,'status':'FAILED',message:'Internal Server Error',data:[]};
}



module.exports = {
    CustomError,
    handleError
}
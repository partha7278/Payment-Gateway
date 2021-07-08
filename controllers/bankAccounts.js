const razorpay = require('../utilities/razorpay/bankAccounts');
const config = require('config');

/**
 * Penny Drop to user bank account using id
 * @param  {object} req - request object
 * @return {object} - return object with status, statusCode, message & data
 */
async function pennyDrop(req){
    
    /** Tracer Start*/
    tracer.trace(req);

    let result = {};
    if(config.get('PAYMENT_GATEWAY') == 'razorpay')
        result = await razorpay.pennyDrop(req);


    /** Tracer End*/
    tracer.trace(req);

    return result;
}







module.exports = {
    pennyDrop
}
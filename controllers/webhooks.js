const config = require('config');
const rezorpayWebhook = require('../utilities/razorpay/webhook');


/**
 * Payment webhook
 * @param  {object} req - request object
 * @return {object} - return object with status, statusCode, message & data
 */
async function Payment(req){
    
    /** Tracer Start*/
    tracer.trace(req);

    let result = {'status':'FAILED','statusCode':500,'message':'Internal Server Error','rowCount':0,'data':null};
    /** rezorpay webhook confirmation  */
    if(config.get('PAYMENT_GATEWAY') == 'razorpay')
        result = await rezorpayWebhook.Confirmation(req);

    /** Tracer End*/
    tracer.trace(req);

    return result;
}







module.exports = {
    Payment
}
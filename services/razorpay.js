const httpService = require('../helpers/httpService');



/**
 * Create customer in razorpay
 * @param  {Object} req - request object
 * @param  {Object} data - data to be send
 * @return {Object} - return with status, statusCode, message & data
 */
async function createCustomer(req, data){

    tracer.trace(req); /** Tracer start */
    let result = await httpService('post', 'https://api.razorpay.com/v1/customers', data, {'Authorization': process.env.RAZORPAY_KEY});
    tracer.trace(req); /** Tracer End*/

    return result;
}



/**
 * Create contacts in razorpay
 * @param  {Object} req - request object
 * @param  {Object} data - data to be send
 * @return {Object} - return with status, statusCode, message & data
 */
async function createContacts(req, data){

    tracer.trace(req); /** Tracer start */
    let result = await httpService('post', 'https://api.razorpay.com/v1/contacts', data, {'Authorization': process.env.RAZORPAY_KEY});
    tracer.trace(req); /** Tracer End*/

    return result;
}



/**
 * Create fund account in razorpay
 * @param  {Object} req - request object
 * @param  {Object} data - data to be send
 * @return {Object} - return with status, statusCode, message & data
 */
async function createFundAccount(req,data){

    tracer.trace(req); /** Tracer start */
    let result = await httpService('post', 'https://api.razorpay.com/v1/fund_accounts', data, {'Authorization': process.env.RAZORPAY_KEY});
    if(result.statusCode == 400){
        result.message = result.data && result.data.error && result.data.error.description ? result.data.error.description : '';
        result.data = '';
    }
    tracer.trace(req); /** Tracer End*/

    return result;
}




/**
 * Create fund account validation in razorpay
 * @param  {Object} req - request object
 * @param  {Object} data - data to be send
 * @return {Object} - return with status, statusCode, message & data
 */
async function createFundAccountValidation(req,data){

    /** Set razorpay payout account number */
    data.account_number = process.env.RAZORPAY_PAYOUT_ACCOUNT;

    tracer.trace(req); /** Tracer start */
    let result = await httpService('post', 'https://api.razorpay.com/v1/fund_accounts/validations', data, {'Authorization': process.env.RAZORPAY_KEY});
    
    /** Error Handle for low balance */
    if(result.statusCode == 400){
        let rezorpayErrorCode = result.data && result.data.error && result.data.error.internal_error_code ? result.data.error.internal_error_code : '';
        if(rezorpayErrorCode == 'BAD_REQUEST_FUND_ACCOUNT_VALIDATION_INSUFFICIENT_BALANCE'){
            let errorObj = {
                message: result.data && result.data.error && result.data.error.description,
                name: 'httpService',
                others: result.data && result.data.error
            };

            logger.error(errorObj);
            
            result.data = '';
            result.statusCode = 500;
            result.message = 'Internal Server Error';
        } 
    }
    tracer.trace(req); /** Tracer End*/

    return result;
}



/**
 * Create payout in razorpay
 * @param  {Object} req - request object
 * @param  {Object} data - data to be send
 * @return {Object} - return with status, statusCode, message & data
 */
async function createPayout(req, data){

    tracer.trace(req); /** Tracer start */

    /** Set razorpay payout account number */
    data.account_number = process.env.RAZORPAY_PAYOUT_ACCOUNT;

    let result = await httpService('post', 'https://api.razorpay.com/v1/payouts', data, {'Authorization': process.env.RAZORPAY_KEY});
    tracer.trace(req); /** Tracer End*/

    return result;
}





module.exports = {
    createCustomer,
    createContacts,
    createFundAccount,
    createFundAccountValidation,
    createPayout
}
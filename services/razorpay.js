const httpService = require('../helpers/httpService');



/**
 * Create customer in razorpay
 * @param  {object} req - request object
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
 * @param  {object} req - request object
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
 * @param  {object} req - request object
 * @param  {Object} data - data to be send
 * @return {Object} - return with status, statusCode, message & data
 */
async function createFundAccount(req,data){

    tracer.trace(req); /** Tracer start */
    let result = await httpService('post', 'https://api.razorpay.com/v1/fund_accounts', data, {'Authorization': process.env.RAZORPAY_KEY});
    tracer.trace(req); /** Tracer End*/

    return result;
}



/**
 * Create payout in razorpay
 * @param  {object} req - request object
 * @param  {Object} data - data to be send
 * @return {Object} - return with status, statusCode, message & data
 */
async function createPayout(req, data){

    tracer.trace(req); /** Tracer start */
    let result = await httpService('post', 'https://api.razorpay.com/v1/payouts', data, {'Authorization': process.env.RAZORPAY_KEY});
    tracer.trace(req); /** Tracer End*/

    return result;
}





module.exports = {
    createCustomer,
    createContacts,
    createFundAccount,
    createPayout
}
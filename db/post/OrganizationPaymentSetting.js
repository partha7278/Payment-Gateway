

/**
 * - Update existing record
 * @param  {object} req - request object
 * @param  {object} data - data need to be update
 * @param  {object} where - update condition
 * @return {object} - return object with status, statusCode, message & data
 */
async function updatePaymentSetting(req, data, where) {
    
    try {
        /** Tracer Start*/
        tracer.trace(req);
        let PaymentSetting = await db.OrganizationPaymentSetting.update(data, { where });
        /** Tracer End*/
        tracer.trace(req);
        
        return {'statusCode':200,'status':'SUCCESS','message':'','rowCount':(PaymentSetting && PaymentSetting[0] ? PaymentSetting[0] : 0),'data':null};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }
}



/**
 * - Insert new record
 * @param  {object} req - request object
 * @param  {object} data - data need to be update
 * @return {object} - return object with status, statusCode, message & data 
 */
async function createPaymentSetting(req, data) {
    
    try {
        /** Tracer Start*/
        tracer.trace(req);
        let PaymentSetting = await db.OrganizationPaymentSetting.create(data);
        /** Tracer End*/
        tracer.trace(req);
        
        return {'statusCode':200,'status':'SUCCESS','message':'','rowCount':(PaymentSetting ? 1 : 0),'data':PaymentSetting};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }
}




module.exports = {
    updatePaymentSetting,
    createPaymentSetting
}
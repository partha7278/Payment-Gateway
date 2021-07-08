

/**
 * - Select one record with id attribute
 * @param  {Object} req - request object
 * @param  {Object} where - select condition
 * @return {Object} - return object with status, statusCode, message & data
 */
async function selectIdPaymentSettingOne(req, where) {
    
    try {
        /** Tracer Start*/
        tracer.trace(req);
        let PaymentSetting = await db.OrganizationPaymentSetting.findOne({ where, attributes:["id"] });
        /** Tracer End*/
        tracer.trace(req);
        
        return {'statusCode':200,'status':'SUCCESS','message':'','rowCount':(PaymentSetting ? 1 : 0),'data':PaymentSetting};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }
}




/**
 * - Select one record with all attribute
 * @param  {Object} req - request object
 * @param  {Object} where - select condition
 * @return {Object} - return object with status, statusCode, message & data
 */
async function selectPaymentSettingOne(req, where) {
    
    try {
        /** Tracer Start*/
        tracer.trace(req);
        let PaymentSetting = await db.OrganizationPaymentSetting.findOne({ where });
        /** Tracer End*/
        tracer.trace(req);
        
        return {'statusCode':200,'status':'SUCCESS','message':'','rowCount':(PaymentSetting ? 1 : 0),'data':PaymentSetting};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }
}





module.exports = {
    selectIdPaymentSettingOne,
    selectPaymentSettingOne
}
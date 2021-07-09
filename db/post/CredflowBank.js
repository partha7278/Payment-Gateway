
/**
 * - Update existing record
 * @param  {Object} req - request object
 * @param  {Object} data - data need to be update
 * @param  {Object} where - update condition
 * @return {Object} - return object with status, statusCode, message & data
*/
async function updateCredflowBank(req, data, where) {
    
    try {
        /** Tracer Start*/
        tracer.trace(req);
        let CredflowBank = await db.CredflowBank.update(data, { where });
        /** Tracer End*/
        tracer.trace(req);
        
        return {'statusCode':200,'status':'SUCCESS','message':'','rowCount':(CredflowBank && CredflowBank[0] ? CredflowBank[0] : 0),'data':null};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }
}





module.exports = {
    updateCredflowBank
}
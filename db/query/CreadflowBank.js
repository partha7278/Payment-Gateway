
/**
 * - Select one record with all attribute
 * @param  {Object} req - request object
 * @param  {Object} where - select condition
 * @return {Object} - return object with status, statusCode, message & data
 */
async function selectCredflowBankOne(req, where) {
    
    try {
        /** Tracer Start*/
        tracer.trace(req);
        let CredflowBank = await db.CredflowBank.findOne({ where });
        /** Tracer End*/
        tracer.trace(req);
        
        return {'statusCode':200,'status':'SUCCESS','message':'','rowCount':(CredflowBank ? 1 : 0),'data':CredflowBank};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }
}



module.exports = {
    selectCredflowBankOne
}
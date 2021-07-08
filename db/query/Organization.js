
/**
 * - Select one record with few attribute
 * @param  {Object} req - request object
 * @param  {Object} where - select condition
 * @param  {Array} attributes - selected attributes
 * @return {Object} - return object with status, statusCode, message & data
 */
async function selectFewOrganizationOne(req, where, attributes) {
    
    try {
        /** Tracer Start*/
        tracer.trace(req);
        let Organization = await db.Organization.findOne({ where, attributes });
        /** Tracer End*/
        tracer.trace(req);
        
        return {'statusCode':200,'status':'SUCCESS','message':'','rowCount':(Organization ? 1 : 0),'data':Organization};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }
}





module.exports = {
    selectFewOrganizationOne
}
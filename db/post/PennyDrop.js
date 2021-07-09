

/**
 * - Update existing record
 * @param  {Object} req - request object
 * @param  {Object} data - data need to be update
 * @param  {Object} where - update condition
 * @return {Object} - return object with status, statusCode, message & data
 */
async function updatePennyDrop(req, data, where) {
    
    try {
        /** Tracer Start*/
        tracer.trace(req);
        let PennyDrop = await db.PennyDrop.update(data, { where });
        /** Tracer End*/
        tracer.trace(req);
        
        return {'statusCode':200,'status':'SUCCESS','message':'','rowCount':(PennyDrop && PennyDrop[0] ? PennyDrop[0] : 0),'data':null};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }
}



/**
 * - Insert new record
 * @param  {Object} req - request object
 * @param  {Object} data - data need to be update
 * @return {Object} - return object with status, statusCode, message & data 
 */
async function createPennyDrop(req, data) {
    
    try {
        /** Tracer Start*/
        tracer.trace(req);
        let PennyDrop = await db.PennyDrop.create(data);
        /** Tracer End*/
        tracer.trace(req);
        
        return {'statusCode':200,'status':'SUCCESS','message':'','rowCount':(PennyDrop ? 1 : 0),'data':PennyDrop};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }
}




module.exports = {
    updatePennyDrop,
    createPennyDrop
}
const Joi = require('joi');
const validationSchema = require('./validationSchema');



/**
 * Validate data
 * @param  {Object} req - request object
 * @param  {string} schemaName - validation schema name
 * @return {object} - return object with status, statusCode, message & data
 */
function validate(req, schemaName){

    tracer.trace(req, schemaName);  /** Tracer Start*/

    //joi validate
    const {error} = validationSchema[schemaName].validate(req.body);

    tracer.trace(req, schemaName);  /** Tracer End*/

    if (error) return {status:'FAILED',statusCode:400,message:error.details[0].message,'rowCount':0,'data':null};
    return {status:'SUCCESS',statusCode:200,message:'','rowCount':0,'data':null};

}


module.exports = {
    validate
}
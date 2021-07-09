const organizationQuery = require('../db/query/Organization');

/**
 * check if gst no present or not
 * @param  {object} req - request object
 * @return {object} - return object with status, statusCode, message & data
 */
async function isGstPresent(req){
    
    /** Tracer Start*/
    tracer.trace(req);

    let organization_id = parseInt(req.header("organization_id")) ? parseInt(req.header("organization_id")) : 0;

    /** Get organization details */
    const organization = await organizationQuery.selectFewOrganizationOne(req, { id: organization_id }, ["gstNo"] );
    if(organization.statusCode != 200) return organization;
    if(!organization.data.gstNo) return {'status':"FAILED",'statusCode':400,'message':"Organization `GST No` cann't be null",'rowCount':0,'data':null};

    /** Tracer End*/
    tracer.trace(req);

    return organization;
}







module.exports = {
    isGstPresent
}
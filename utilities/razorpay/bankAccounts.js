const razorpay = require('../../services/razorpay');
const credflowBankQuery = require('../../db/query/CreadflowBank');
const organizationQuery = require('../../db/query/Organization');
const organizationPost = require('../../db/post/Organization');



/**
 * Penny Drop to user bank account using razorpay
 * @param  {Object} req - request object
 * @return {Object} - return object with status, statusCode, message & data
 */
async function pennyDrop(req){

    tracer.trace(req); /** Tracer start */
    let organization_id = parseInt(req.header("organization_id")) ? parseInt(req.header("organization_id")) : 0;
    
    /** Get organization details */
    let organization = await organizationQuery.selectFewOrganizationOne(req, { id: organization_id }, ["rezorpayCustomerId","rezorpayContactId"] );
    if(organization.statusCode != 200) return organization;

    /** Generate customer */
    if(!organization.data.rezorpayCustomerId){
       const customerDetails = await customerGenerate(req);
       if(customerDetails.statusCode != 200) return customerDetails;
       organization.data.rezorpayCustomerId = customerDetails.data.id;
    }

    /** Generate contact */
    if(!organization.data.rezorpayContactId){
       const contactDetails = await contactGenerate(req);
       if(contactDetails.statusCode != 200) return contactDetails;
       organization.data.rezorpayContactId = contactDetails.data.id;
    }


    /** Get bank details */
    let bank = await credflowBankQuery.selectCredflowBankOne(req, { id :req.body.bankId, organizationId: organization_id });
    if(bank.statusCode != 200) return bank;


    /** Create Fund Account */
    //TODO create funcd id & payout 1 rs
    // razorpay.createFundAccount();


    tracer.trace(req); /** Tracer end */

    return organization;
}




/**
 * Create customer and update in db
 * @param  {Object} req - request object
 * @return {Object} - return object with status, statusCode, message & data
 */
async function customerGenerate(req){

    tracer.trace(req); /** Tracer start */

    let organization_id = parseInt(req.header("organization_id")) ? parseInt(req.header("organization_id")) : 0;

    /** Get organization details */
    let organization = await organizationQuery.selectFewOrganizationOne(req, { id: organization_id }, ["name","email","gstNo","mobile"] );
    if(organization.statusCode != 200) return organization;

    /** Data for create razorpay customers */
    const data = {
        "name": organization.data.name,
        "contact": organization.data.mobile,
        "email": organization.data.email,
        "fail_existing":"0",
        "gstin": organization.data.gstNo,
        "notes": {
            "organizationId": organization_id
        }
    };

    /** Create Razorpay customers */
    const result = await razorpay.createCustomer(req, data);
    if(result.statusCode != 200) return result;

    /** update razorpay customer_id */
    await organizationPost.updateOrganization(req, {"rezorpayCustomerId": result.data.id}, { id: organization_id });

    tracer.trace(req); /** Tracer end */

    return result;
}





/**
 * Create contact and update in db
 * @param  {Object} req - request object
 * @return {Object} - return object with status, statusCode, message & data
 */
async function contactGenerate(req){

    tracer.trace(req); /** Tracer start */

    let organization_id = parseInt(req.header("organization_id")) ? parseInt(req.header("organization_id")) : 0;

    /** Get organization details */
    let organization = await organizationQuery.selectFewOrganizationOne(req, { id: organization_id }, ["name","email","mobile"] );
    if(organization.statusCode != 200) return organization;

    /** Data for create razorpay contact */
    const data = {
        "name": organization.data.name,
        "contact": organization.data.mobile,
        "email": organization.data.email,
        "type":"customer",
        "notes": {
            "organizationId": organization_id
        }
    };

    /** Create Razorpay contact */
    const result = await razorpay.createContacts(req, data);
    if(result.statusCode != 200) return result;

    /** update razorpay contact_id */
    await organizationPost.updateOrganization(req, {"rezorpayContactId": result.data.id}, { id: organization_id });

    tracer.trace(req); /** Tracer end */

    return result;
}




module.exports = {
    pennyDrop
}
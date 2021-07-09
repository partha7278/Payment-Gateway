const razorpay = require('../../services/razorpay');
const credflowBankQuery = require('../../db/query/CredflowBank');
const credflowBankPost = require('../../db/post/CredflowBank');
const organizationQuery = require('../../db/query/Organization');
const organizationPost = require('../../db/post/Organization');
const pennyDropPost = require('../../db/post/PennyDrop');


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
    if(bank.rowCount == 0) return {'status':'FAILED','statusCode':400,'message':'Invalid `bankId`','rowCount':0,'data':null};
    

    /** Create Fund Account */
    let fundData = {
        "contact_id": organization.data.rezorpayContactId,
        "account_type":"bank_account",
        "bank_account":{
            "name": bank.data.name,
            "ifsc": bank.data.ifsc,
            "account_number": bank.data.accountNumber
        }
    };
    let fundAccount = await razorpay.createFundAccount(req, fundData);
    if(fundAccount.statusCode != 200) return fundAccount;
    bank.data.rezorpayFundId = fundAccount.data.id;


    /** Update rezorpayFundId in bank  */
    await credflowBankPost.updateCredflowBank(req, { "rezorpayFundId":fundAccount.data.id }, { id :req.body.bankId, organizationId: organization_id });


    /** Generate fund account validation */
    let fundAccountValidation = await fundAccountValidationGenerate(req, bank.data);


    tracer.trace(req); /** Tracer end */

    return fundAccountValidation;
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
    if(!organization.data.gstNo) return {'status':"FAILED",'statusCode':400,'message':"Organization `GST No` cann't be null",'rowCount':0,'data':null};

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



/**
 * Create fund account validation & add in db
 * @param  {Object} req - request object
 * @param  {Object} bank - bank details object
 * @return {Object} - return object with status, statusCode, message & data
 */
async function fundAccountValidationGenerate(req, bank){

    tracer.trace(req); /** Tracer start */
   
    let fundDataValidation = {
        "fund_account": {
            "id": bank.rezorpayFundId
        },
        "amount": 100,
        "notes": {
            "credflowBankId": bank.id,
            "organizationId": bank.organizationId
        }
    };
    let fundAccountValidation = await razorpay.createFundAccountValidation(req, fundDataValidation);
    if(fundAccountValidation.statusCode != 200) return fundAccountValidation;
    
    
    /** Create pennydrop record */
    let pennyDropData = {
        credflowBanksId: bank.id,
        referenceId : fundAccountValidation.data.id,
        paymentGateway : 'razorpay',
        amount : 1,
        status : 'queue'
    };
    await pennyDropPost.createPennyDrop(req, pennyDropData);

    tracer.trace(req); /** Tracer end */

    return {'status':'SUCCESS','statusCode':200,'message':'','rowCount':0, 'data':null}
}



module.exports = {
    pennyDrop
}
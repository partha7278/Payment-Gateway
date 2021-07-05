const paymentSettingPost = require('../db/post/OrganizationPaymentSetting');
const paymentSettingQuery = require('../db/query/OrganizationPaymentSetting');


/**
 * - Create or Update PaymentSetting
 * @param  {object} req - request object
 * @return {object} - return object with status, statusCode, message & data
 */
async function updateOrCreatePaymentSetting(req){
    
    /** Tracer Start*/
    tracer.trace(req);


    let data = {};
    let organizationId = parseInt(req.header("organization_id"));
    let where = { organizationId : organizationId };


    /** Set all column in data */
    if(req.body.paymentOnboardingComplete != undefined)
        data.paymentOnboardingComplete = req.body.paymentOnboardingComplete ? req.body.paymentOnboardingComplete : false;

    if(req.body.isAllowedInvoiceRef != undefined)
        data.isAllowedInvoiceRef = req.body.isAllowedInvoiceRef ? req.body.isAllowedInvoiceRef : false;
    
    if(req.body.automaticReceiptSharing != undefined)
        data.automaticReceiptSharing = req.body.automaticReceiptSharing ? req.body.automaticReceiptSharing : false;
    
    if(req.body.isCardPayment != undefined)
        data.isCardPayment = req.body.isCardPayment ? req.body.isCardPayment : false;
    
    if(req.body.isNetBanking != undefined)
        data.isNetBanking = req.body.isNetBanking ? req.body.isNetBanking : false;
    
    if(req.body.isUPI != undefined)
        data.isUPI = req.body.isUPI ? req.body.isUPI : false;
    
    if(req.body.chargeDebtorOnCardPayment != undefined)
        data.chargeDebtorOnCardPayment = req.body.chargeDebtorOnCardPayment ? req.body.chargeDebtorOnCardPayment : false;
    
    if(req.body.chargeDebtorOnNetBanking != undefined)
        data.chargeDebtorOnNetBanking = req.body.chargeDebtorOnNetBanking ? req.body.chargeDebtorOnNetBanking : false;
    
    if(req.body.chargeDebtorOnUPI != undefined)
        data.chargeDebtorOnUPI = req.body.chargeDebtorOnUPI ? req.body.chargeDebtorOnUPI : false;
    
    if(req.body.sendReceiptAsRegular != undefined)
        data.sendReceiptAsRegular = req.body.sendReceiptAsRegular ? req.body.sendReceiptAsRegular : false;
    
    if(req.body.autoApproveAndSendToTally != undefined)
        data.autoApproveAndSendToTally = req.body.autoApproveAndSendToTally ? req.body.autoApproveAndSendToTally : false;
    
    if(req.body.autoSettleToDefaultAccount != undefined)
        data.autoSettleToDefaultAccount = req.body.autoSettleToDefaultAccount ? req.body.autoSettleToDefaultAccount : false;
    
    if(req.body.moneyHoldingDays != undefined)
        data.moneyHoldingDays = req.body.moneyHoldingDays ? req.body.moneyHoldingDays : 0;



    if(Object.keys(data).length == 0)
        return {'statusCode':400,'status':'FAILED','message':'At least one setting needed to be update','rowCount':0,'data':''};



    let result = {};
    let record = await paymentSettingQuery.selectIdPaymentSettingOne(req, where);

    if(record.rowCount == 0 && record.statusCode == 200){
        data.organizationId = organizationId;
        result = await paymentSettingPost.createPaymentSetting(req, data);
    }
    else if(record.statusCode == 200){
        result = await paymentSettingPost.updatePaymentSetting(req, data, where);
    }
    else{
        return record;
    }

    /** Tracer End*/
    tracer.trace(req);

    return result;
}





/**
 * - Select PaymentSetting
 * @param  {object} req - request object
 * @return {object} - return object with status, statusCode, message & data
 */
async function selectPaymentSetting(req){

    /** Tracer Start*/
    tracer.trace(req);


    let organizationId = parseInt(req.header("organization_id"));
    let where = { organizationId : organizationId };

    let result = await paymentSettingQuery.selectPaymentSettingOne(req, where);

    /** Tracer End*/
    tracer.trace(req);

    return result;
}




module.exports = {
    updateOrCreatePaymentSetting,
    selectPaymentSetting
}
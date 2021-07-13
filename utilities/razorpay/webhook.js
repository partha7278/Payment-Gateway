const razorpay = require('../../services/razorpay');
const credflowBankPost = require('../../db/post/CredflowBank');
const pennyDropPost = require('../../db/post/PennyDrop');


/**
 * Payment webhook
 * @param  {object} req - request object
 * @return {object} - return object with status, statusCode, message & data
 */
async function Confirmation(req){

    /** Tracer Start*/
    tracer.trace(req);

    let result = {'status':'FAILED','statusCode':404,'message':'Not Found','rowCount':0,'data':null};

    switch(req.body.event){
    
        case "fund_account.validation.completed":
            result = await fundAccountValidation(req);
            break;

        case "fund_account.validation.failed":
            result = await fundAccountValidation(req);
            break;

    }


    /** Tracer End*/
    tracer.trace(req);

    return result;
}




/**
 * Fund Account Validation 
 * @param  {object} req - request object
 * @return {object} - return object with status, statusCode, message & data
 */
async function fundAccountValidation(req){
    /** Tracer Start*/
    tracer.trace(req);

    let result = {'status':'FAILED','statusCode':400,'message':'Something went wrong','rowCount':0,'data':null};
    
    try{
        let referenceId = req.body.payload["fund_account.validation"].entity.id;
        let fundAccountId = req.body.payload["fund_account.validation"].entity.fund_account.id;
        let status = req.body.payload["fund_account.validation"].entity.status == "completed" ? "success" : "failed";
        
        /** Update isVerified in bank  */
        await credflowBankPost.updateCredflowBank(req, { "isVerified": (status=="success" ? true : false) }, { "rezorpayFundId" :fundAccountId });

        /** Update status in pennyDrop */
        result = await pennyDropPost.updatePennyDrop(req, {status}, {"referenceId":referenceId})
    }
    catch(e){
        logger.error(e); 
    }

    /** Tracer End*/
    tracer.trace(req);

    return result;
}



module.exports = {
    Confirmation
}
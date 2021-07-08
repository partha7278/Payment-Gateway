const Joi = require('joi');


const Schemas = {
    /** Payment Settings Create validation */
    createPaymentSettings: Joi.object({
        paymentOnboardingComplete: Joi.optional(),
        isAllowedInvoiceRef: Joi.optional(),
        automaticReceiptSharing: Joi.optional(),
        isCardPayment: Joi.optional(),
        isNetBanking: Joi.optional(),
        isUPI: Joi.optional(),
        chargeDebtorOnCardPayment: Joi.optional(),
        chargeDebtorOnNetBanking: Joi.optional(),
        chargeDebtorOnUPI: Joi.optional(),
        sendReceiptAsRegular: Joi.optional(),
        autoApproveAndSendToTally: Joi.optional(),
        autoSettleToDefaultAccount: Joi.optional(),
        moneyHoldingDays: Joi.optional(),
    }),
    
}


module.exports = Schemas;
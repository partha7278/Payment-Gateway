const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhooks');
const webhookAuth = require('../middlewares/auth/webhook');
const PAYMENT_KEY = process.env.PAYMENT_WEBHOOK_KEY;


/** Payment Webhook */
router.post('/payment', [webhookAuth(PAYMENT_KEY)], async (req,res)=> {

    const result = await webhookController.Payment(req);
    return res.status(result.statusCode).send(result);
});





module.exports = router;
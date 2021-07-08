const express = require('express');
const router = express.Router();
const paymentSettingsController = require('../controllers/paymentSettings');
const organizationAdmin = require('../middlewares/auth/organizationAdmin');
const organizationUser = require('../middlewares/auth/organizationUser');



/** Update or Create paymentSettings */
router.post('/update', [organizationAdmin], async (req,res)=> {

    const result = await paymentSettingsController.updateOrCreatePaymentSetting(req);
    return res.status(result.statusCode).send(result);
});



/** get paymentSettings */
router.get('/fetch', [organizationUser], async (req,res)=> {

    const result = await paymentSettingsController.selectPaymentSetting(req);
    return res.status(result.statusCode).send(result);
});





module.exports = router;
const express = require('express');
const router = express.Router();
const organizationUser = require('../middlewares/auth/organizationUser');
const organizationController = require('../controllers/organizations');



/** check if gst no present or not */
router.get('/isGstPresent', [organizationUser], async (req,res)=> {

    const result = await organizationController.isGstPresent(req);
    return res.status(result.statusCode).send(result);
});




module.exports = router;
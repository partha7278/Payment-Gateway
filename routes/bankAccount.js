const express = require('express');
const router = express.Router();
const organizationAdmin = require('../middlewares/auth/organizationAdmin');
const organizationUser = require('../middlewares/auth/organizationUser');
const bankAccountController = require('../controllers/bankAccounts');



/** Penny Drop to user bank account */
router.post('/pennyDrop', [organizationUser], async (req,res)=> {

    const result = await bankAccountController.pennyDrop(req);
    return res.status(result.statusCode).send(result);
});




module.exports = router;
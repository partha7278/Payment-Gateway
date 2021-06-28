const express = require('express');
const router = express.Router();
const userQuery = require('../db/query/User');



router.get('/status', (req,res)=> {

    return res.send({'statusCode':200,'status':'SUCCESS','message':'Healthy','rowCount':0,'data':[]});
});



router.get('/test', async (req,res)=> {

    let result = await userQuery.getUser(req);
    return res.status(result.statusCode).send(result);
});



module.exports = router;
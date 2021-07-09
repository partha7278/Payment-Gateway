const express = require('express');
const router = express.Router();
const httpService = require('../helpers/httpService');


/** get server health status */
router.get('/status', (req,res)=> {

    return res.send({'statusCode':200,'status':'SUCCESS','message':'Healthy','rowCount':0,'data':[]});
});




/** Test webhook for testing */
router.post('/webhook', async (req,res)=> {

    await httpService('post', process.env.SLACK_TEST_WEBHOOK_URL, {"text": JSON.stringify(req.body)} );

    return res.send({'statusCode':200,'status':'SUCCESS','message':'Webhook called','rowCount':0,'data':[]});
});


module.exports = router;
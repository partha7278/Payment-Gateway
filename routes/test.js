const express = require('express');
const router = express.Router();



router.get('/status', (req,res)=> {

    return res.send({'statusCode':200,'status':'SUCCESS','message':'Healthy','rowCount':0,'data':[]});
});



module.exports = router;
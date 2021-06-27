const express = require('express');
const router = express.Router();



router.get('/status', (req,res)=> {
    return res.send({'status':200,'message':'Healthy'});
    
});



module.exports = router;
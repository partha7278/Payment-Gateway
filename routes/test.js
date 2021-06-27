const express = require('express');
const router = express.Router();
const {
  performance,
  PerformanceObserver
} = require('perf_hooks');



router.get('/status', (req,res)=> {
    console.log(c);
    return res.send({'status':200,'message':'Healthy'});
    
});



module.exports = router;
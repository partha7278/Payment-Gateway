const { performance } = require('perf_hooks');



module.exports = () => { 
    return function (req, res ,next){


        /** when tracing on log tracing entry data */
        if(process.env.TRACING_LEVEL > 0){
            req.tracing = [];
            req.lastProcessedTime = performance.now();
            req.tracing.push({'entry':0});
        }

        res.sendResponse = res.send;
        res.send = (body) => {

            /** when tracing on log tracing exit data */
            if(process.env.TRACING_LEVEL > 0){
                let time = req.lastProcessTime - process.hrtime();
                req.tracing.push({'exit':time});
            }
            
            res.sendResponse(body);
        }
        next();
    }

}
const { performance } = require('perf_hooks');



module.exports = () => { 
    return function (req, res ,next){


        /** when tracing on log tracing entry data */
        if(process.env.TRACING_LEVEL > 0)
            tracer.entry(req);


        res.sendResponse = res.send;
        res.send = (body) => {

            /** when tracing on log tracing exit data */
            if(process.env.TRACING_LEVEL > 0)
                tracer.exit(req);
            
            res.sendResponse(body);
        }
        next();
    }

}
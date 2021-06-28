const { performance } = require('perf_hooks');
const config = require('config');


module.exports = function (req, res ,next){

    /** when tracing on log tracing entry data */
    if(config.get('TRACING_LEVEL') > 0)
        tracer.entry(req);


    res.sendResponse = res.send;
    res.send = (body) => {

        /** when tracing on log tracing exit data */
        if(config.get('TRACING_LEVEL') > 0)
            tracer.exit(req);
        
        res.sendResponse(body);
    }
    next();
}
const apiPrefix = process.env.API_PREFIX;
const testRoute = require('./test');
const tracing = require('../middlewares/tracing');



module.exports = function(app){


    /** Tracing use for trace api performance */
    app.use(tracing());

    /** Top level routing */
    app.use(apiPrefix+'/test',testRoute);
    

}
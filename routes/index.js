const config = require('config');
const apiPrefix = config.get('API_PREFIX');
const tracing = require('../middlewares/tracing');
const testRoute = require('./test');



module.exports = function(app){


    /** Tracing use for trace api performance */
    app.use(tracing);

    /** Top level routing */
    app.use(apiPrefix+'/test',testRoute);
    

}
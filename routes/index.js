const config = require('config');
const apiPrefix = config.get('API_PREFIX');
const tracing = require('../middlewares/tracing');
const tokenDecode = require('../middlewares/auth/tokenDecode');
const user = require('../middlewares/auth/user');

const testRoute = require('./test');
const paymentSettingRoute = require('./paymentSetting');



module.exports = function(app){


    /** Middleware - Tracing use for trace api performance */
    app.use(tracing);

    /** Middleware - Decode JWT token */
    app.use(tokenDecode);


    /** Top level routing */
    app.use(apiPrefix+'/test',testRoute);
    app.use(apiPrefix+'/paymentSetting',user,paymentSettingRoute);

    

}
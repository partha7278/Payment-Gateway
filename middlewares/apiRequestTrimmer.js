const _ = require('underscore');

module.exports = async function(req, res, next){

    req.body = _.object(_.map(req.body, function (value, key) {
        if(typeof value == "string"){
            return [key, value.trim()];
        }else{
            return [key, value];
        }
    }));
    
    next();
}
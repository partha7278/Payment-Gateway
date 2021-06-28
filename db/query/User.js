const moment = require('moment');



async function getUser(req) {

    try {
        let user = await db.User.findOne({ where : { id: 1 } });
        return {'statusCode':200,'status':'SUCCESS','message':'','data':[user]};
    }
    catch(ex) {
        return handleError(new CustomError(ex.name, ex.message, ex.parent), req.user);
    }

}


module.exports = {
    getUser
}
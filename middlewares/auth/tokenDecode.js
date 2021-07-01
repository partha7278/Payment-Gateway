const jwt = require("jsonwebtoken");



module.exports = async function(req, res, next) {

    try {

        /** Validate JWT Token */
        const token = req.header("x-auth-token");
        if(token){
            let userId = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

            /** fetch user details & set user details in req */
            let user = await db.User.findOne({ where: { id: userId } });
            if(user)
                req.user = user;
        }

    }catch (ex) {
        logger.error(ex);
    }

    next();
};

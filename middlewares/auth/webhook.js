module.exports = function(key){

    return function(req, res,next){ 
 
        if(req.query.key !== key) 
            return res.status(401).send({'status':'FAILED','statusCode':401,'message':'Unauthenticated access','rowCount':0,'data':null});
            
        next();
    }
}
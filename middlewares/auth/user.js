module.exports = function(req, res,next){
    
    if(!(req.user && req.user.id)) 
        return res.status(401).send({'status':'FAILED','statusCode':401,'message':'Unauthenticated access','rowCount':0,'data':''});
        
    next();
}
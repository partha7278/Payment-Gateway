

module.exports = async function (err, req, res){
    
    /** log error */
    logger.error(err,req.user); 

    let error = '';
    return res.json({'status':'FAILED',message:'Something went wrong','statusCode':500,data:[]});
}

module.exports = async function(req, res, next) {

    let organizationId = req.header("organization_id") ? parseInt(req.header("organization_id")) : 0;

    /** Check user is oraganization Admin or not */
    let organization = await db.TagUserOrganization.findOne({
        where : {
            userId: req.user.id,
            organizationId: organizationId
        },
        attributes: [ 'id' ]
    });

    if(!organization)
        return res.status(403).send({'status':'FAILED','statusCode':403,'message':'Unauthorized access','rowCount':0,'data':''});

    next();
}
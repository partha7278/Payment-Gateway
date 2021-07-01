const httpService = require('../helpers/httpService');



/**
 * @param  {string} message - slack notification message
 * @param  {string} errorLog - optional - log error if error occur 
 * @return 
 */
function slackNotification(message, errorLog=1){

    httpService('post', process.env.SLACK_WEBHOOK_URL, {"text": message}, {}, errorLog);
}




module.exports = {
    slackNotification
}
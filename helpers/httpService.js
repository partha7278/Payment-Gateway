const axios = require('axios');




/**
 * @param  {string} method - any method either get/post/put/delete
 * @param  {string} url - endpoint or request
 * @param  {object} data - data send 
 * @param  {object} headers - headers
 * @return {object} - return with status, statusCode, message & data
 */
module.exports = function httpService(method, url, data={}, headers={}, errorLog=1) {

    if(!url || !method)
        return {'status':'FAILED','statusCode':400,'message':'URL & Method required','data':''};

    let config = {
        method: method.toLowerCase(),
        url: url,
        data: data,
        headers: headers
    }


    return new Promise(function(resolve, reject) {
        axios(config).then( (res) => {
            console.log(res.data);
            resolve(res.data)
        })
        .catch((error) => {
        
            if(errorLog == 1){

                let errorObj = {
                    message: error.response.statusText,
                    name: 'httpService',
                    others: {
                        'status':error.response.status,
                        'statusText':error.response.statusText,
                        'config': config,
                        'data': (error.response.data ? error.response.data : '')
                    }
                };

                logger.error(errorObj);
            }

            resolve({'status':'FAILED','statusCode':error.response.status,'message':error.response.statusText,'data':(error.response.data ? error.response.data : '')});
        });
    });

}



# Stormbreaker
Stormbreaker is a Payment Gateway Integration project<br/>
Project Documentation https://app.clickup.com/t/2na6t9

Access Url:- http://localhost:6001

### VS Code Extention need: 
1. [Add jsdoc comments](https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments)
2. [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)


### Resources
1. [HTTP Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)


### Config
* API_PREFIX
* TRACING_LEVEL 
    =>  _0=off; 1=basic; 2=depth_
* TRACING_LOG 
    =>  _1=console; 2=log; 3=console+log_
* LOGGING 
    =>  _1=error; 2=info_
* ERROR_LOG_PATH
* INFO_LOG_PATH
* TRACING_LOG_PATH
* PAYMENT_GATEWAY


### Rule
* use _tracer.trace(req)_ in every function at begining and ending (before return)
* use _logger.error(error)_ for log the error
* For more see previous code


### Global variable
* logger - for log purpose 
* tracer - for trace the performance
* db - for db operation
* CustomError - for generate custom Error
* handleError - for handle error and return failed object
* validate - for validate incoming json data 



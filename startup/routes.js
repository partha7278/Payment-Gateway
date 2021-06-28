const error = require('../middlewares/error');
const trimmer = require('../middlewares/apiRequestTrimmer');
const api = require('../routes/index');


module.exports = async function(app){


    /** triming all spaces from front & back */
    app.use(trimmer);

    /** api routes */
    api(app);


    /** not found page */
    app.use('/*',(req,res,next)=>{
        res.status(404).send('Page not found');
    });

    /** error handling */
    app.use(error);
}
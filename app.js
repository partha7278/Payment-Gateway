const express = require('express');
const helmet = require("helmet");
const app = express();
const cors = require('./middlewares/cors');
require('dotenv').config();
let logger = require('./startup/logging');
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");


/** Error handlers */
require('express-async-errors');
require('./startup/errorHandler')();



/** Set Global variables */
global.logger = { info: logger.info, error: logger.error };
global.tracer = require('./helpers/tracer');
global.db = require('./startup/db');
let {CustomError, handleError } = require('./startup/customError');
global.CustomError = CustomError;
global.handleError = handleError;



/** Middlewares */
app.use(helmet());
app.set('trust proxy', 1);
app.use(cors);
require('./startup/routes')(app);



const port = process.env.PORT || 6002;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));


module.exports = server;
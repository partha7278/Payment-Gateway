const express = require('express');
const helmet = require("helmet");
const app = express();
const cors = require('./middlewares/cors');
require('dotenv').config();
var bodyParser = require('body-parser')
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");


/** Error handlers */
require('express-async-errors');
require('./startup/errorHandler')();



/** Set Global variables */
let logger = require('./startup/logging');
global.logger = { info: logger.info, error: logger.error };
global.tracer = require('./helpers/tracer');
global.db = require('./startup/db');
let {CustomError, handleError } = require('./helpers/customError');
global.CustomError = CustomError;
global.handleError = handleError;
let { validate } = require('./helpers/validation/index');
global.validate = validate;



/** Middlewares */
app.use(helmet());
app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors);
require('./startup/routes')(app);



const port = process.env.PORT || 6002;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));


module.exports = server;
const express = require('express');
const helmet = require("helmet");
const app = express();
const cors = require('./middlewares/cors');
require('dotenv').config();
let logger = require('./startup/logging');
global.logger = { info: logger.info, error: logger.error };
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");



require('express-async-errors');
require('./startup/errorHandler')();
app.use(helmet());
app.set('trust proxy', 1);

app.use(cors);
require('./startup/routes')(app);


const port = process.env.PORT || 6002;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));


module.exports = server;
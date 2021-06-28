const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);




/** Create new sequelize pool connection */
const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,{ 
    "dialect": "postgres",
    "operatorsAliases": 1,
    "logging" : false,
    "pool" : {
        min : 0,
        max : 8,
        idle : 10000
    },
});


/** Check DB connection */
sequelize.authenticate().then((res) => {
    logger.info('Database connected successfully');
})
.catch ((error) => {
    logger.error(error);
    return;
})


/** Import all models */
let db = {};
fs.readdirSync('db/models').filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
})
.forEach(file => {
    file = file.substring(0,file.length-3);
    const model = require(path.join('../db/models', file))(sequelize, DataTypes);
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
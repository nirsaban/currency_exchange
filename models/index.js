const sequelize = require("./db.model");
const Sequelize = require('sequelize');
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.AlertModel = require("./alert.model")(sequelize, Sequelize);
db.WatchedCurrency = require("./watched_currency.model")(sequelize, Sequelize);
module.exports = db;
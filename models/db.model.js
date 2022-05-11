const mysql = require("mysql");
const dbConfig = require("../config/db.config");
const Sequelize = require('sequelize');    
var connection = new Sequelize(dbConfig.database,dbConfig.user,dbConfig.password,dbConfig.options);
module.exports = connection;
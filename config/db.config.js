require('dotenv').config();
console.log(process.env.DB)
const dbConfig = {
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        host: process.env.HOST,
        port: 3306,
        dialect: 'mysql'
    }
}

module.exports = dbConfig;

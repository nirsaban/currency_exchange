
module.exports = (sql, Sequelize) => {

    const Alert = sql.define('alert', {
        Timestamp: {
          type: Sequelize.DATE
        },
        Currency_symbol: {
          type: Sequelize.STRING
        },
        ValueToDate: {
          type: Sequelize.FLOAT
        }
     },
     {
        timestamps: false
     });
     return Alert
 

}
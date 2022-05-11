
module.exports = (sql, Sequelize) => {

    const WatchedCurrency = sql.define('watched_currency',{
        Currency_symbol: {
          type: Sequelize.STRING
        },
        Threshold: {
          type: Sequelize.STRING
        },
     },
     {
        timestamps: false
     });

     return WatchedCurrency
}
const EventEmitter = require('events');
const db = require("./index")
var format = require("date-format");
const HttpRequest = require("../helpers/httpRequest.helper")


class Monitor extends EventEmitter {

    static async  checkCurrenciesDifference(callback){
        let newData = await this.getAllCurrencies();
        let currentData = await this.getDataFromDB();
        let diff = [];
        for(let i = 0; i < currentData.length; i++){
            let item =  newData[currentData[i].Currency_symbol]
            if(item  && item != currentData[i].Threshold){
                // assign the new value to update the db
                currentData[i].Threshold = item
                let newRow = currentData[i] 
                diff.push(newRow)
            }
        }
       return callback(diff)
    }

    static async  getAllCurrencies(){
        try {
            const apiUrl = process.env.API_ENDPOINTS;
            let {data:{date,usd}} =  ( await new HttpRequest(apiUrl).get())
            return usd;    
        } catch (error) {
            throw new Error(error.message)
        }
        
    }

    static async getDataFromDB(){
        const data = await db.WatchedCurrency.findAll();
        return  Object.values(JSON.parse(JSON.stringify(data)))
    }

    static async insertToWatchedTable(){
        let arr = [];
        for(let i in newData){
            arr.push({
                Currency_symbol:i,
                Threshold:newData[i]
            })
        }
        await db.WatchedCurrency.bulkCreate(arr)
    }

    static async updateWatchedCurrencies(data){
      await db.WatchedCurrency.bulkCreate(
            data,
            {
              updateOnDuplicate: ["Threshold"],
            }
          );
         
    }

    static async insertAlert(data){
        let prepareAlerts  = data.map(row => {
            return {
                Timestamp:format("yyyy-MM-dd"),
                ValueToDate:row.Threshold,
                Currency_symbol:row.Currency_symbol
            }
        })
        await db.AlertModel.bulkCreate(prepareAlerts)
    }
}


const myEmitter = new Monitor();


myEmitter.on('check-currencies-difference',(clb) =>  Monitor.checkCurrenciesDifference(clb));
myEmitter.on("update-watched_currencies",(args) => Monitor.updateWatchedCurrencies(args) )
myEmitter.on("insert-alert",(args) => Monitor.insertAlert(args) )

module.exports = myEmitter
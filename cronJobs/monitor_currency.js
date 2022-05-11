const cron = require("node-cron");
const myEmitter = require("../models/monitor.model");
const monitorEmitter = require("../models/monitor.model")

const task = cron.schedule("*/30 * * * * *", function () {

    monitorEmitter.emit("check-currencies-difference" , (diff) => {
        if(diff.length > 0) {
            monitorEmitter.emit("update-watched_currencies",diff);
            monitorEmitter.emit("insert-alert",diff)
        }
    })
});

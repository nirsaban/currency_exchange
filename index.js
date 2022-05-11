const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models/index")
require('dotenv').config()
const routes = require("./routes");


require("./cronJobs/monitor_currency")
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/",routes);

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`SERVER RUNING ON PORT ${port}`)
})

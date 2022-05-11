const db = require("../models/index")

exports.get = async (req,res) => {

    try {
        const allAlerts = await db.AlertModel.findAll();
        let orderData =   Object.values(JSON.parse(JSON.stringify(allAlerts)))
        res.status(200).send({
            status: 200,
            data: orderData
        });
    } catch (error) {
        return res.status(404).send({
            message: 'no data Found',
            errors: error.message,
            status: 404
        });
    }




}
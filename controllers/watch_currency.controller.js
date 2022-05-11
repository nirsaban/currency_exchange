const db = require("../models/index")
const VALIDATION_TYPES = require("../validations/validation.types")
const {sanitize} = require("../validations/validation")
exports.create = async (req,res) => {
    try {
        let row = sanitize(VALIDATION_TYPES.CREATE_CURRENCY_WATCHED, req.body);
         await db.WatchedCurrency.create(row)
        res.status(200).send({
            status: 200,
            message: 'Data Save Successfully',
            data: row
        });
    } catch (error) {
        return res.status(400).send({
            message: 'Unable to insert data',
            errors: error.message,
            status: 400
        });
    }
}
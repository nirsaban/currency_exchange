const router = require("express").Router();
const watchCurrencyController = require("../controllers/watch_currency.controller.js");
const alertController = require("../controllers/alert.controller");


router.post("/watched-currency",watchCurrencyController.create);
router.get("/alerts",alertController.get);

module.exports = router
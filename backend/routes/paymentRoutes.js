const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create", paymentController.createBilling);
router.put("/update-status", paymentController.updateBillingStatus);

module.exports = router;

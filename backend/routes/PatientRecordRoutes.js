const express = require("express");
const router = express.Router();
// const patientRecordController = require("../controllers/patientRecordController");
const auth = require("../middleware/auth");
const patientRecordController = require("../controllers/patientRecordController");

router.get("/doctor", auth, patientRecordController.getPatientRecords);
router.post("/", patientRecordController.addTreatment);
router.put("/:recordId", patientRecordController.updateTreatment);

module.exports = router;

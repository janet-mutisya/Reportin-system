const express = require("express");
const router = express.Router();
const report = require("../controllers/reportController"); 
const upload = require("../middleware/uploads");           
const auth = require("../middleware/auth");                

// post route
router.post("/create", auth, upload.single("sickSheet"), report.createReport);

// Get all reports
router.get("/all", auth, report.getAllReports);

// Get single report by ID
router.get("/:id", auth, report.getReportById);

// Update report
router.put("/:id", auth, upload.single("sickSheet"), report.updateReport);

// Delete report
router.delete("/:id", auth, report.deleteReport);
module.exports = router;

const Report = require("../models/report");

// Create report
exports.createReport = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const report = new Report({
      title,
      description,
      status,
      reportedBy: req.user._id,
      sickSheet: req.file ? req.file.path : null,
    });

    const savedReport = await report.save();
    res.status(201).json({ message: "Report saved", data: savedReport });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({recordStatus: "active"})
      .populate("reportedBy", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Reports fetched successfully", data: reports });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("reportedBy", "username email");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report fetched successfully", data: report });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update a report
exports.updateReport = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };

    if (req.file) {
      updatedData.sickSheet = req.file.path;
    }

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report updated successfully", data: updatedReport });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// softDelete a report
exports.deleteReport = async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { recordStatus: "deleted" },
      { new: true }
    );

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report soft deleted successfully", data: deletedReport });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



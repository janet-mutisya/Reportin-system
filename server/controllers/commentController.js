const Comment = require("../models/comment");

// Create a comment
exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment = new Comment({
      content,
      reportedBy: req.user._id,
    });

    const savedComment = await comment.save();
    res.status(201).json({ message: "Comment created successfully", data: savedComment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all active comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ status: "active" })
      .populate("reportedBy", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Comments fetched successfully", data: comments });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get a comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("reportedBy", "username email");

    if (!comment || comment.status === "deleted") {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment fetched successfully", data: comment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.id, status: "active" },
      { content: req.body.content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found or already deleted" });
    }

    res.status(200).json({ message: "Comment updated successfully", data: updatedComment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Soft delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status: "deleted" },
      { new: true }
    );

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }p

    res.status(200).json({ message: "Comment soft deleted successfully", data: deletedComment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

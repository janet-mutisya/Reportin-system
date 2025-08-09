const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

// Create a comment 
router.post("/", auth, commentController.createComment);

// Get all comments 
router.get("/", commentController.getAllComments);

// Get a comment by ID 
router.get("/:id", commentController.getCommentById);

// Update comment by ID 
router.put("/:id", auth, commentController.updateComment);

// Delete comment by ID 
router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;

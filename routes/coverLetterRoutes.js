const express = require("express");
const {
  createCoverLetter,
  getCoverLetters,
  getCoverLetterById,
  updateCoverLetter,
  deleteCoverLetter,
} = require("../controllers/coverLetterController");

const router = express.Router();

// Post route for creating cover letter
router.post("/", createCoverLetter);

// Get route for retrieving cover letters for a specific user
router.get("/user/:userName", getCoverLetters);  // Make sure this handler is defined in your controller

// Get route for retrieving a cover letter by ID
router.get("/:id", getCoverLetterById);

// Put route for updating cover letter by ID
router.put("/:id", updateCoverLetter);

// Delete route for deleting cover letter by ID
router.delete("/:id", deleteCoverLetter);

module.exports = router;

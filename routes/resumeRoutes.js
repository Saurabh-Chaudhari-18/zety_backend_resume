const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Define routes with correct controller functions
router.get('/', resumeController.getResumes);            // Get all resumes
router.get('/:id', resumeController.getResumeById);      // Get resume by ID
router.post('/', resumeController.createResume);         // Create a resume
router.put('/:id', resumeController.updateResume);       // Update a resume
router.delete('/:id', resumeController.deleteResume);    // Delete a resume
router.post('/generate-pdf', resumeController.generateResumePDF);

module.exports = router;

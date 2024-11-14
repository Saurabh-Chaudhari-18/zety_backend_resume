// routes/pdfRoutes.js
const express = require('express');
const { generatePDF } = require('../controllers/pdfController');
const router = express.Router();

router.get('/:name', generatePDF);

module.exports = router;

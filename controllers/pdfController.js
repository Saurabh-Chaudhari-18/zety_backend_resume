
const Resume = require('../models/Resume');
const CoverLetter = require('../models/CoverLetter');
const PDFDocument = require('pdfkit');

exports.generatePDF = async (req, res) => {
  try {
    const resumes = await Resume.find({ name: req.params.name });
    const coverLetters = await CoverLetter.find({ name: req.params.name });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(20).text('Resumes and Cover Letters', { align: 'center' });

    resumes.forEach((resume, index) => {
      doc.addPage().fontSize(16).text(`Resume ${index + 1}`);
      
    });

    coverLetters.forEach((coverLetter, index) => {
      doc.addPage().fontSize(16).text(`Cover Letter ${index + 1}`);
      
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

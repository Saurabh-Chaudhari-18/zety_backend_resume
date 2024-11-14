const Resume = require("../models/Resume");
const PDFDocument = require("pdfkit");

// Create a new resume
exports.createResume = async (req, res) => {
  try {
    const newResume = new Resume({
      personalInfo: {
        name: req.body.personalInfo.name,
        email: req.body.personalInfo.email,
        phone: req.body.personalInfo.phone,
        // add additional personal info fields here if needed
      },
      education: req.body.education.map((edu) => ({
        degree: edu.degree,
        institution: edu.institution,
        year: edu.year,
      })),
      experience: req.body.experience.map((exp) => ({
        title: exp.title,
        company: exp.company,
        description: exp.description,
        duration: exp.duration,
      })),
      skills: req.body.skills,
      summary: req.body.summary,
    });

    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating resume", error: error.message });
  }
};

// Get all resumes
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({});
    res.status(200).json(resumes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving resumes", error: error.message });
  }
};

// Get resume by ID
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving resume", error: error.message });
  }
};

// Update resume
exports.updateResume = async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      {
        personalInfo: {
          name: req.body.personalInfo.name,
          email: req.body.personalInfo.email,
          phone: req.body.personalInfo.phone,
        },
        education: req.body.education.map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year,
        })),
        experience: req.body.experience.map((exp) => ({
          title: exp.title,
          company: exp.company,
          description: exp.description,
          duration: exp.duration,
        })),
        skills: req.body.skills,
        summary: req.body.summary,
      },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found for update" });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating resume", error: error.message });
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);
    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found for deletion" });
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting resume", error: error.message });
  }
};
exports.generateResumePDF = async (req, res) => {
  try {
    const resumeData = req.body; // Get resume data from the request

    // Create a new PDF document
    const doc = new PDFDocument();
    const filename = `resume_${Date.now()}.pdf`;

    // Set response headers to handle the PDF as a download
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add resume data to the PDF
    doc.fontSize(20).text("Resume", { align: "center" });

    // Personal Info Section
    doc.moveDown();
    const personalInfo = resumeData.personalInfo || {};
    doc.fontSize(16).text(`Name: ${personalInfo.name || "N/A"}`);
    doc.text(`Email: ${personalInfo.email || "N/A"}`);
    doc.text(`Phone: ${personalInfo.phone || "N/A"}`);

    // Education Section
    doc.moveDown();
    doc.fontSize(18).text("Education", { underline: true });
    const education = resumeData.education || [];
    education.forEach((edu) => {
      doc.moveDown();
      doc.fontSize(14).text(`Degree: ${edu.degree || "N/A"}`);
      doc.text(`Institution: ${edu.institution || "N/A"}`);
      doc.text(`Year: ${edu.year || "N/A"}`);
    });

    // Work Experience Section
    doc.moveDown();
    doc.fontSize(18).text("Work Experience", { underline: true });
    const workExperience = resumeData.workExperience || [];
    workExperience.forEach((work) => {
      doc.moveDown();
      doc.fontSize(14).text(`Position: ${work.position || "N/A"}`);
      doc.text(`Company: ${work.company || "N/A"}`);
      doc.text(`Duration: ${work.duration || "N/A"}`);
      doc.text(`Description: ${work.description || "N/A"}`);
    });

    // Finalize the document
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Error generating PDF", error: error.message });
    }
  }
};

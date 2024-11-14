const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");
const coverLetterRoutes = require("./routes/coverLetterRoutes");  // Ensure this is the correct path for your cover letter routes
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

// Middleware to enable CORS and parse JSON request bodies
app.use(cors());
app.use(express.json());

// Routes for the application
app.use("/api/resumes", resumeRoutes);  // Handling resume-related routes
app.use("/api/coverLetters", coverLetterRoutes);  // Handling cover letter-related routes
app.use("/api/pdf", pdfRoutes);  // Handling PDF-related routes

// Export the app module for use in server.js or other files
module.exports = app;

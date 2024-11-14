const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    // other personal fields
  },
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      description: String,
      duration: String,
    },
  ],
  skills: [String],
  summary: String,
});

module.exports = mongoose.model('Resume', resumeSchema);

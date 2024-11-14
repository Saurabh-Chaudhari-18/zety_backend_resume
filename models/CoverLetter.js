const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema({
  subjectDetails: {
    subjectName: { type: String, required: true },
    title: { type: String, required: true },
  },
  openingString: { type: String, required: true },
  writer: {
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profession: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: false },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: false },
  },
  receiver: {
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profession: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: false },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: false },
  },
  letterBody: { type: String, required: true },
  closingText: { type: String, required: true },
  conclusion: { type: String, required: true },
});

module.exports = mongoose.model("CoverLetter", coverLetterSchema);

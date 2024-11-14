const CoverLetter = require('../models/CoverLetter');

// Create a new cover letter
exports.createCoverLetter = async (req, res) => {
  try {
    const newCoverLetter = new CoverLetter({
      subjectDetails: {
        subjectName: req.body.subjectDetails.subjectName,
        title: req.body.subjectDetails.title
      },
      openingString: req.body.openingString,
      writer: {
        userName: req.body.writer.userName,
        firstName: req.body.writer.firstName,
        lastName: req.body.writer.lastName,
        profession: req.body.writer.profession,
        city: req.body.writer.city,
        state: req.body.writer.state,
        zip: req.body.writer.zip,
        phone: req.body.writer.phone,
        email: req.body.writer.email,
        companyName: req.body.writer.companyName
      },
      receiver: {
        userName: req.body.receiver.userName,
        firstName: req.body.receiver.firstName,
        lastName: req.body.receiver.lastName,
        profession: req.body.receiver.profession,
        city: req.body.receiver.city,
        state: req.body.receiver.state,
        zip: req.body.receiver.zip,
        phone: req.body.receiver.phone,
        email: req.body.receiver.email,
        companyName: req.body.receiver.companyName
      },
      letterBody: req.body.letterBody,
      closingText: req.body.closingText,
      conclusion: req.body.conclusion
    });

    const savedCoverLetter = await newCoverLetter.save();
    res.status(201).json(savedCoverLetter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cover letter', error: error.message });
  }
};

// Get all cover letters for a specific user
exports.getCoverLetters = async (req, res) => {
  try {
    const userName = req.params.userName;
    const coverLetters = await CoverLetter.find({ "writer.userName": userName });

    if (!coverLetters.length) {
      return res.status(404).json({ message: 'No cover letters found for this user' });
    }

    res.status(200).json(coverLetters);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cover letters', error: error.message });
  }
};

// Get cover letter by ID
exports.getCoverLetterById = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findById(req.params.id);
    if (!coverLetter) {
      return res.status(404).json({ message: 'Cover letter not found' });
    }
    res.status(200).json(coverLetter);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cover letter', error: error.message });
  }
};

// Update cover letter
exports.updateCoverLetter = async (req, res) => {
  try {
    const updatedCoverLetter = await CoverLetter.findByIdAndUpdate(
      req.params.id,
      {
        subjectDetails: {
          subjectName: req.body.subjectDetails.subjectName,
          title: req.body.subjectDetails.title
        },
        openingString: req.body.openingString,
        writer: {
          userName: req.body.writer.userName,
          firstName: req.body.writer.firstName,
          lastName: req.body.writer.lastName,
          profession: req.body.writer.profession,
          city: req.body.writer.city,
          state: req.body.writer.state,
          zip: req.body.writer.zip,
          phone: req.body.writer.phone,
          email: req.body.writer.email,
          companyName: req.body.writer.companyName
        },
        receiver: {
          userName: req.body.receiver.userName,
          firstName: req.body.receiver.firstName,
          lastName: req.body.receiver.lastName,
          profession: req.body.receiver.profession,
          city: req.body.receiver.city,
          state: req.body.receiver.state,
          zip: req.body.receiver.zip,
          phone: req.body.receiver.phone,
          email: req.body.receiver.email,
          companyName: req.body.receiver.companyName
        },
        letterBody: req.body.letterBody,
        closingText: req.body.closingText,
        conclusion: req.body.conclusion
      },
      { new: true }
    );

    if (!updatedCoverLetter) {
      return res.status(404).json({ message: 'Cover letter not found for update' });
    }

    res.status(200).json(updatedCoverLetter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cover letter', error: error.message });
  }
};

// Delete cover letter
exports.deleteCoverLetter = async (req, res) => {
  try {
    const deletedCoverLetter = await CoverLetter.findByIdAndDelete(req.params.id);
    if (!deletedCoverLetter) {
      return res.status(404).json({ message: 'Cover letter not found for deletion' });
    }
    res.status(200).json({ message: 'Cover letter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cover letter', error: error.message });
  }
};

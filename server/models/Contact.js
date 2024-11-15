const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);

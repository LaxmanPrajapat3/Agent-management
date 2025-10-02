const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  originalFile: { type: String } // optional: filename or upload id
}, { timestamps: true });

module.exports = mongoose.model('Entry', EntrySchema);

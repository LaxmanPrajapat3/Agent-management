const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entry' }],
  uploadRef: { type: String } // optional
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);


const csvParser = require('csv-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const Entry = require('../models/Entry');
const Agent = require('../models/Agent');
const Assignment = require('../models/Assignment');
const stream = require('stream');
const path = require('path');

// Helper: parse CSV from buffer stream
function parseCSVBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const results = [];
    const readStream = new stream.PassThrough();
    readStream.end(buffer);

    readStream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

// Helper: parse xlsx buffer
function parseXLSXBuffer(buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(sheet);
  return json;
}

exports.uploadFile = async (req, res) => {
  // multer provides req.file
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const filename = req.file.originalname;
  const extension = path.extname(filename).toLowerCase();
  const allowed = ['.csv', '.xlsx', '.xls'];
  if (!allowed.includes(extension)) {
    return res.status(400).json({ message: 'Invalid file type. Allowed: csv, xlsx, xls' });
  }

  try {
    let rows = [];
    if (extension === '.csv') {
      rows = await parseCSVBuffer(req.file.buffer);
    } else {
      rows = parseXLSXBuffer(req.file.buffer);
    }

    // Normalize rows: ensure FirstName, Phone, Notes keys exist (case-insensitive)
    const normalized = rows.map(r => {
      // keys could be 'FirstName', 'firstName', 'firstname', etc.
      const keys = Object.keys(r);
      const lookup = {};
      keys.forEach(k => lookup[k.toLowerCase()] = r[k]);

      return {
        firstName: (lookup['firstname'] || lookup['first name'] || lookup['first'] || '').toString().trim(),
        phone: (lookup['phone'] || lookup['phone number'] || lookup['phonenumber'] || lookup['mobile'] || '').toString().trim(),
        notes: (lookup['notes'] || lookup['note'] || '').toString().trim()
      };
    }).filter(item => item.firstName && item.phone); // filter out invalid rows

    if (!normalized.length) return res.status(400).json({ message: 'No valid rows found in file' });

    // save entries in DB
    const entries = await Entry.insertMany(normalized.map(e => ({ ...e, originalFile: filename })));

    // Distribute equally among 5 agents:
    // fetch 5 agents (if fewer than 5 exist, distribute among available)
    const agents = await Agent.find().limit(5);
    if (!agents.length) {
      return res.status(400).json({ message: 'No agents available to assign' });
    }

    const numAgents = agents.length;
    const total = entries.length;
    const perAgent = Math.floor(total / numAgents);
    const remainder = total % numAgents;

    // create assignments
    // sequential distribution: first distribute perAgent to each, then distribute remainder starting from agent0
    const assignments = [];
    let pointer = 0;
    for (let i = 0; i < numAgents; i++) {
      let count = perAgent + (i < remainder ? 1 : 0);
      const assignedEntries = entries.slice(pointer, pointer + count).map(e => e._id);
      pointer += count;
      const ass = await Assignment.create({
        agent: agents[i]._id,
        entries: assignedEntries,
        uploadRef: filename
      });
      assignments.push(ass);
    }

    // populate response detail
    const populated = await Assignment.find({ uploadRef: filename }).populate('agent', '-passwordHash').populate('entries');

    res.json({
      message: 'File processed and distributed',
      totalEntries: total,
      agentsUsed: numAgents,
      distribution: populated
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error during file processing' });
  }
};

// Get assignments summary
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('agent', '-passwordHash').populate('entries').sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const bcrypt = require('bcryptjs');
const Agent = require('../models/Agent');

// Create agent
exports.createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) return res.status(400).json({ message: 'Missing fields' });

    const exists = await Agent.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Agent with email already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const agent = await Agent.create({ name, email, mobile, passwordHash });
    res.status(201).json(agent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// List agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select('-passwordHash').sort({ createdAt: -1 });
    res.json(agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single agent
exports.getAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).select('-passwordHash');
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update
exports.updateAgent = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.passwordHash = await bcrypt.hash(updates.password, salt);
      delete updates.password;
    }
    const agent = await Agent.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash');
    res.json(agent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete
exports.deleteAgent = async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Agent deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const agentController = require('../controllers/agentController');

// all these are protected
router.use(auth);

router.post('/', agentController.createAgent);
router.get('/', agentController.getAgents);
router.get('/:id', agentController.getAgent);
router.put('/:id', agentController.updateAgent);
router.delete('/:id', agentController.deleteAgent);

module.exports = router;

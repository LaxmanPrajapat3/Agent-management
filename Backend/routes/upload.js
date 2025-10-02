const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// multer memory storage to parse buffer directly
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/file', auth, upload.single('file'), uploadController.uploadFile);
router.get('/assignments', auth, uploadController.getAssignments);

module.exports = router;

const express = require('express');
const Student = require('../models/StudentModel')
const { addStudent, loginUser } = require('../controllers/StudentController');
const router = express.Router();

router.post('/', addStudent)
router.post('/', loginUser)

module.exports = router;

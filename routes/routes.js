const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
router.get('/', userController.getHomePage);
router.post('/submit', userController.submitForm);
module.exports = router;

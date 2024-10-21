const express = require('express');
const router = express.Router();
const userController = require('../model.js'); 

router.get('/', userController.getHomePage);
router.post('/submit', userController.submitForm);

module.exports = router;

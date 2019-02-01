// const constants = require('../constants');
const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experiences.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.isAuthenticated, experienceController.experience);

module.exports = router;
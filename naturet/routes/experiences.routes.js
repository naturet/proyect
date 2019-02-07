const constants = require('../constants');
const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experiences.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const uploadCloud = require('../configs/cloudinary.config.js');

router.get('/create',  authMiddleware.isAuthenticated, authMiddleware.userIsCreator, experienceController.create);
router.post('/create', authMiddleware.isAuthenticated, authMiddleware.userIsCreator, uploadCloud.array('photo'), experienceController.doCreate);

router.get('/:id', authMiddleware.userIsCreator, experienceController.get);
router.get('/:id/delete',  authMiddleware.isAuthenticated, authMiddleware.userIsCreator, experienceController.delete);

module.exports = router;
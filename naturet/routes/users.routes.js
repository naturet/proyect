const constants = require('../constants');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const uploadCloud = require('../configs/cloudinary.config.js');

// const upload = multer({ dest: './uploads' })

router.get('/profile',authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, usersController.profile);
router.get('/profile/edit', authMiddleware.isAuthenticated, usersController.edit);
router.post('/profile/edit', authMiddleware.isAuthenticated, uploadCloud.single('picture'), usersController.doEdit);

router.get('/', 
  authMiddleware.isAuthenticated,
  authMiddleware.isProfileCompleted, 
  (req, res, next) => {
    res.send('=D!')
  });

router.post('/profile/delete', 
  authMiddleware.isAuthenticated, 
  authMiddleware.checkRole(constants.ROLE_ADMIN), 
  usersController.doDelete);

module.exports = router;

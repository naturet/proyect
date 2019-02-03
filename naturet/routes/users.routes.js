const constants = require('../constants');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({ dest: './uploads' })

router.get('/profile',authMiddleware.isProfileCompleted, authMiddleware.isAuthenticated, usersController.profile);
router.get('/profile/edit', authMiddleware.isAuthenticated, usersController.doProfile);
router.post('/profile/edit', authMiddleware.isAuthenticated, upload.single('picture'), usersController.doProfile);

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

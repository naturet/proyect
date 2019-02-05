const constants = require('../constants');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const uploadCloud = require('../configs/cloudinary.config.js');


router.get('/profile',authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, usersController.profile);

router.get('/profile/create', authMiddleware.isAuthenticated, authMiddleware.isProfileUncompleted, usersController.create);
router.post('/profile/create', authMiddleware.isAuthenticated, uploadCloud.array('picture'), usersController.doCreate);

router.get('/profile/edit', authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, usersController.edit);
router.post('/profile/edit', authMiddleware.isAuthenticated, uploadCloud.array('picture'), usersController.doEdit);

router.get('/creator/create',authMiddleware.isAuthenticated,authMiddleware.isCreator,authMiddleware.isProfileCompleted,  usersController.creator);
router.post('/creator/create', authMiddleware.isAuthenticated,authMiddleware.isCreator,authMiddleware.isProfileCompleted, uploadCloud.single('enterprise_picture'), usersController.doCreator);

router.get('/creator/edit',authMiddleware.isAuthenticated,authMiddleware.isProfileCompleted,  usersController.editCreator);
router.post('/creator/edit', authMiddleware.isAuthenticated,authMiddleware.isProfileCompleted, uploadCloud.single('enterprise_picture'), usersController.doEditCreator);



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

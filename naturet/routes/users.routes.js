const constants = require('../constants');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const uploadCloud = require('../configs/cloudinary.config.js');



router.get('/profile', authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, usersController.profile);


router.get('/profile/create', authMiddleware.isAuthenticated, authMiddleware.isProfileUncompleted, usersController.create);
router.post('/profile/create', authMiddleware.isAuthenticated, uploadCloud.array('picture'), usersController.doCreate);

router.get('/profile/edit', authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, usersController.edit);
router.post('/profile/edit', authMiddleware.isAuthenticated, uploadCloud.array('picture'), usersController.doEdit);

router.get('/:id', authMiddleware.isAuthenticated, usersController.getOtherProfile)

router.get('/creator/create', authMiddleware.isAuthenticated, authMiddleware.isCreator, authMiddleware.isProfileCompleted, usersController.creator);
router.post('/creator/create', authMiddleware.isAuthenticated, authMiddleware.isCreator, authMiddleware.isProfileCompleted, uploadCloud.single('enterprise_picture'), usersController.doCreator);

router.get('/creator/edit', authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, usersController.editCreator);
router.post('/creator/edit', authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, uploadCloud.single('enterprise_picture'), usersController.doEditCreator);

router.get('/', authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, usersController.getHome);

//---News letters--//

router.post('/subscribe',authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, usersController.subscribe);

module.exports = router;
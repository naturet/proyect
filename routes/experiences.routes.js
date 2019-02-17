const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experiences.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadCloud = require('../configs/cloudinary.config.js');

router.get('/results', authMiddleware.isAuthenticated, authMiddleware.isProfileCompleted, experienceController.results);


router.get('/create',  authMiddleware.isAuthenticated, authMiddleware.userIsCreator, experienceController.create);
router.post('/create', authMiddleware.isAuthenticated, authMiddleware.userIsCreator, uploadCloud.array('photo'), experienceController.doCreate);

router.get('/:id', authMiddleware.isAuthenticated, experienceController.get);
router.get('/:id/delete',  authMiddleware.isAuthenticated, authMiddleware.userIsCreator, experienceController.delete);

router.post('/:id/follow', authMiddleware.isAuthenticated, experienceController.follow);
router.post('/:id/unfollow', authMiddleware.isAuthenticated, experienceController.unFollow);

router.get('/:id/paypage', authMiddleware.isAuthenticated, experienceController.paypage);
router.post('/:id/charge', authMiddleware.isAuthenticated, experienceController.purchased);
router.get('/:id/thankyou', authMiddleware.isAuthenticated, experienceController.thankyou);

router.get('/:id/comment', authMiddleware.isAuthenticated, experienceController.comment);
router.post('/:id/docomment', authMiddleware.isAuthenticated, experienceController.doComment);

/// Node mailer

router.post('/send',authMiddleware.isAuthenticated, experienceController.send);

module.exports = router;
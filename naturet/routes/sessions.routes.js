const passport = require('passport');
const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions.controller');
const profileController = require('../middlewares/cat.middleware');
const authMiddlerware = require('../middlewares/sessions.middleware');

router.get('/', sessionsController.list)
router.get('/create', sessionsController.create);


router.post('/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));

router.get('/:provider/cb', sessionsController.createWithIDPCallback);

router.get('/:id/edit',  sessionsController.edit);
router.post('/:id/edit', sessionsController.doEdit);

router.get('/profile', authMiddlerware.isAuthenticated, profileController.isProfileCompleted, sessionsController.profile);


module.exports = router;

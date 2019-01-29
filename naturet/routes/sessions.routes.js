const passport = require('passport');
const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions.controller');
const profileController = require('../middlewares/cat.middleware');

router.get('/create', sessionsController.create);
router.post('/:id/edit', sessionsController.doEdit);

router.post('/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));

router.get('/:provider/cb', sessionsController.createWithIDPCallback);

router.get('/profile', profileController.isProfileCompleted, sessionsController.profile);

module.exports = router;

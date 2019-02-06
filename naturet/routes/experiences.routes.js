const constants = require('../constants');
const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experiences.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// router.get('/', authMiddleware.isAuthenticated, experienceController.list);

router.get('/create', authMiddleware.isAuthenticated, experienceController.create);
router.post('/create', authMiddleware.isAuthenticated, experienceController.doCreate);

router.get('/:id/edit', authMiddleware.isAuthenticated, experienceController.edit);
router.post('/:id/edit', authMiddleware.isAuthenticated,experienceController.doEdit);

router.get('/:id', authMiddleware.isAuthenticated, experienceController.get);
router.get('/:id/delete', experienceController.delete);

module.exports = router;
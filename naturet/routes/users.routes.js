const constants = require('../constants');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/categories', authMiddleware.isAuthenticated, usersController.list);
// router.get('/:id/profile', authMiddleware.isAuthenticated, usersController.profile);
router.get('/:id/edit', authMiddleware.isAuthenticated, usersController.edit);
router.post('/:id/edit', authMiddleware.isAuthenticated,usersController.doEdit);

router.post('/:id/delete', 
  authMiddleware.isAuthenticated, 
  authMiddleware.checkRole(constants.ROLE_ADMIN), 
  usersController.doDelete);

module.exports = router;

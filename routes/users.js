const express = require('express');

const usersController = require('../controllers/users_controller');
const router = express.Router();
router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signup);
router.get('/sign-in',usersController.signin);
router.post('/creates',usersController.creates);
module.exports = router;
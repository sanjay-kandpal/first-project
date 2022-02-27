const express = require('express');
const router  = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');
const post = require('../controllers/post_controller');

router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/sign-up',usersController.signup);
router.get('/sign-in',usersController.signin);
router.post('/creates',usersController.creates);
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);

router.get('/sign-out',usersController.destroySession);


module.exports = router;
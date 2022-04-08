const express = require('express');
const router  = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');
const post = require('../controllers/post_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-up',usersController.signup);
router.get('/sign-in',usersController.signin);
router.post('/creates',usersController.creates);
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);

router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/sign-in'}),usersController.createSession);
router.get('/auth/facebook',passport.authenticate('facebook',{scope: ['profile','email']}));
router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/users/sign-in' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;
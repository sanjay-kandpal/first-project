const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

passport.use(new FacebookStrategy({
    clientID: '534183821394262',
    clientSecret: '0a6c1e59ba67a949b26de91d0b15cecd',
    callbackURL: "http://localhost:8000/users/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.emails[0].value }).exec(function(err,user){
        if(err){
            console.log('Facebook login problem',err);
            return;
        }
        console.log(profile);

        if(user){
            return done(null,user);
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value
        },function(err,user){
            if(err){
                console.log('error in creating facebook strategy',err);
                return;
            }
            return done(null,user);
        });
        }
    
    });
  }
));
module.exports = passport;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

require('../models/user');
var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' }, (username, password, done) => {
        User.findOne({email: username}, (err, user) => {
            if (err)
                return done(err, null, {message: err.message});
            // user does not exist
            else if (!user)
                return done(null, null, {message: 'Email does not exist'});
            // wrong password
            else if (!user.verifyPassword(password))
                return done(null, null, {message: 'Wrong password.'});
            // authentication succeeded
            else
                return done(null, user, {message: 'Authentication succeeded'});
        });
    })
);


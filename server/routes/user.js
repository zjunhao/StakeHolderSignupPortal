const express = require('express');
const passport = require('passport');
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');
const _ = require('lodash');
const route = express.Router();

const jwtHelper = require('../config/jwtHelper');
const User = require('../models/user');


// signUp a user
route.post('/createUser', (req, res)=>{
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    });

    newUser.save((err, user) => {
        if (!err)
            res.json({success: true, message: 'New user created successfully'});
        else {
            if (err.code == 11000)
                res.json({success: false, message: 'Email already exists'});
            else
                res.json({success: false, message: err.message});
        }
    });
});

// login a user
route.post('/loginUser', (req, res)=>{
    // call for passport authentication defined inside passportConfig.js
    passport.authenticate('local', (err, user, info) => {
        if (err) {          // error when finding document
            return res.status(400).json({success: false, message: err.message});
        } else if (!user) { // email does not exist or wrong password
            return res.status(401).json({success: false, message: info.message});
        } else {
            return res.status(200).json({success: true, message: 'Login succeed', token: user.generateJwt()});
        }
    })(req, res);
});

// get basic user infomation
route.get('/getCurrentUserInfo', jwtHelper.verifyJwtToken, (req, res)=> {
    // req._id added from middleware jwtHelper.verifyJwtToken
    User.findById(req._id, (err, user)=> {
        if (err) {
            return res.status(400).json({success: false, message: err.message});
        } else if (!user) {
            return res.status(400).json({success: false, message: 'User not found.' });
        } else {
            return res.status(200).json({success: true, message:'User info found', user: _.pick(user, ['_id', 'email', 'name', 'privilege'])})
        }
    })
});

// promote a user to admin
route.put('/promoteUser/:id', jwtHelper.verifyJwtToken, (req, res)=>{
    if (!req.params.id) {
        return res.json({success: false, message: 'Missing user id in request parameters'});
    }
    if (!req.body.passcode) {
        return res.json({success: false, message: 'Missing passcode in request'});
    }
    if (req.body.passcode.localeCompare(process.env.ACCOUNT_PROMOTION_PASSCODE) !== 0) {
        return res.json({success: false, message: 'Passcode not correct'});
    }

    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.json({success: false, message: err.message});
        } else if (!user) {
            res.json({success: false, message: 'Cannot find user using provided user id'});
        } else if (user.privilege.localeCompare('administrator') === 0){
            res.json({success: false, message: 'The account is admistrator already'});
        } else{
            user.updateOne({$set: {privilege: 'administrator'}}, (err) => {
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Account promotion succeed'});
                }
            })
        }
    });
});

// remove the user's admin privilege
route.put('/removeUserAdmin/:id', jwtHelper.verifyJwtToken, (req, res)=>{

    if (!req.params.id) {
        return res.json({success: false, message: 'Missing user id in request parameters'});
    }

    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.json({success: false, message: err.message});
        } else if (!user) {
            res.json({success: false, message: 'Cannot find user using provided user id'});
        } else if (user.privilege.localeCompare('normal') === 0){
            res.json({success: false, message: 'Cannot remove administrator privilege since this user is not an administrator'});
        } else{
            user.updateOne({$set: {privilege: 'normal'}}, (err) => {
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Administrator privilege removed'});
                }
            })
        }
    });
});

// ----------------------------- password reset ------------------------------------------
route.post('/sendPasswordResetEmail', (req, res)=>{
    if (!("passwordResetPageBaseUri" in req.body)) {
        return res.status(400).json({success: false, message: 'Missing passwordResetPageBaseUri in request body'});
    } else if (!("email" in req.body)) {
        return res.status(400).json({success: false, message: 'Missing email address in request body'});
    }
    async.waterfall([
        // generate password reset token
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        // save token and token expire time to user account
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                  return res.status(400).json({success: false, message: "Email does not exist"})
                }
            
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            
                user.save(function(err) {
                  done(err, token, user);
                });
            });
        },
        // send password reset email out
        function(token, user, done) {
            const transporter  = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.SENDGRID_USERNAME,
                  pass: process.env.SENDGRID_PASSWORD
                }
            });
            const mailOptions = {
                to: user.email,
                from: 'verify@stakeholdersignupportal.com',
                subject: 'Password reset request',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account in stakeholder signup portal.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                     req.body.passwordResetPageBaseUri + '/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                done(err, 'done');
            });
        }], 
        function(err) {
            if (err) {
                return res.status(500).json({success:false, messsage: err.message});
            }
            else {
                return res.status(200).json({success:true, message: 'Password reset email sent!'});
            }
        }
    );
});

route.put('/resetPassword/:token', (req, res)=>{
    async.waterfall([
        // update password
        function(done) {
            const query = {resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() }};
            User.findOne( query, (err, user) => {
                if (err) {
                    return res.status(500).json({success: false, message: err.message});
                } else if (!('password' in req.body)) {
                    return res.status(400).json({success: false, message: 'Missing password in request body'});
                } else if (!user) {
                    return res.status(400).json({success: false, message: 'Password reset token is invalid or has expired, please try resend password reset email.'});
                } else {
                    user.password = req.body.password;
                    user.resetPasswordToken = null;
                    user.resetPasswordExpires = null;
                    user.save((err, updatedUser)=>{
                        done(err, updatedUser);
                    })
                }
            })
        },
        // send out email notice
        function(user, done) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'verify@stakeholdersignupportal.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                  'This is a confirmation that the password for your account ' + user.email + ' in stake holder signup portal has just been changed.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                done(err);
            });
        }], 
        function(err) {
            if (err) {
                return res.status(500).json({success: false, message: err.message});
            } else {
                return res.status(200).json({success: true, message: 'Password reset succeed!'});
            }
        }
    );
});

module.exports = route;
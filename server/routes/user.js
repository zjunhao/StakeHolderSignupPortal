const express = require('express');
const passport = require('passport');
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
            user.update({$set: {privilege: 'administrator'}}, (err) => {
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
            user.update({$set: {privilege: 'normal'}}, (err) => {
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Administrator privilege removed'});
                }
            })
        }
    });
});

module.exports = route;
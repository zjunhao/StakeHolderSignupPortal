const express = require('express');
const route = express.Router();

const User = require('../models/user');

// signUp a user
route.post('/createUser', (req, res)=>{
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    });

    User.find({email: req.body.email}, (err, user) => {
        if (err) {
            res.json({success: false, message: err.message});
        } else if (user.length > 0) {
            res.json({success: false, message: 'email already exists'});
        } else {
            newUser.save((err, user)=>{
                if(err){
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'New user created successfully'});
                }
            });
        }
    })
});

// login a user
route.post('/loginUser', (req, res)=>{
    if (!req.body.email || !req.body.password) {
        res.json({success: false, message: 'Missing email or password'});
        return;
    }
    User.find({email: req.body.email}, (err, user) => {
        if (err) {
            res.json({success: false, message: err.message});
        } else if (user.length > 1){
            res.json({success: false, message: 'More than one user use the same email'});
        } else if (user.length === 0) {
            res.json({success: false, message: 'Email does not exist'});
        } else {
            if (req.body.password !== user[0].password) {
                res.json({success: false, message: 'Password not correct'});
            } else {
                res.json({
                    success: true, 
                    message: 'Login succeed',
                    user: {
                        _id: user[0]._id,
                        email: user[0].email,
                        name: user[0].name,
                        privilege: user[0].privilege
                    }
                });
            }
        }
    })
});

// promote a user to admin
route.put('/promoteUser/:id', (req, res)=>{
    // const correctPasscode = 'P@ssc0de4pr0m0t10n';
    const correctPasscode = 'passcode';

    if (!req.params.id) {
        return res.json({success: false, message: 'Missing user id in request parameters'});
    }
    if (!req.body.passcode) {
        return res.json({success: false, message: 'Missing passcode in request'});
    }
    if (req.body.passcode.localeCompare(correctPasscode) !== 0) {
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
            user.privilege = 'administrator';
            user.save((err) => {
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
route.put('/removeUserAdmin/:id', (req, res)=>{

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
            user.privilege = 'normal';
            user.save((err) => {
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
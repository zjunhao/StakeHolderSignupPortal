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
})

module.exports = route;
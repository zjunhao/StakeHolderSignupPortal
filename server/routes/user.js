const express = require('express');
const route = express.Router();

const User = require('../models/user');

route.get('/example', (req, res) => {
    res.send('/example being hit');
});

// signUp a user
route.post('/createUser', (req, res)=>{
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    });

    // TODO: if user alreay exists, error back
    newUser.save((err, user)=>{
        if(err){
            res.json({msg: 'Failed to create new user'});
        } else {
            res.json({msg: 'New user created successfully'});
        }
    });
});

// login a user
route.post('/loginUser', (req, res)=>{
    if (!req.body.email || !req.body.password) {
        res.json({success: false, message: 'Missing email or password'});
    }
    User.find({email: req.body.email}, (err, user) => {
        if (err) {
            res.json({success: false, message: err});
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
                    userInfo: {
                        _id: user[0]._id,
                        email: user[0].email,
                        name: user[0].name
                    }
                });
            }
        }
    })
})

module.exports = route;
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

    newUser.save((err, user)=>{
        if(err){
            res.json({msg: 'Failed to create new user'});
        } else {
            res.json({msg: 'New user created successfully'});
        }
    });
});

module.exports = route;
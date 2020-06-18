const express = require('express');
const route = express.Router();

const User = require('../models/user');

route.get('/example', (req, res) => {
    res.send('/example being hit');
});

// create a new sprint review
route.post('/createUser', (req, res)=>{
    let newUser = new User({
        name: req.body.name,
        email: req.body.email
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
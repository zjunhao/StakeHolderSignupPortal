const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({

    email: {
        type: String,
        required: 'Email cannot be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password cannot be empty'
    },
    name: {
        type: String,
        required: 'Name cannot be empty'
    },
    // normal user or administrator
    privilege: {
        type: String,
        default: 'normal'
    },
    saltSecret: String
});

// validate email address
UserSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid email.');

// generate saltsecret and hash password before save
UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
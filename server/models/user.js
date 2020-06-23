const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // normal user or administrator
    privilege: {
        type: String,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
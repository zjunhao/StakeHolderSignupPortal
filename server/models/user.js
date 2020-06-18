const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    // normal user or administrator
    privilege: {
        type: String,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    name: String,
    email: String,
    preferences: {
        language: String,
        notifications: {
            email: Boolean,
            sms: Boolean
        }
    },
    hash: String,
    salt: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;

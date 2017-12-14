const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_firstName:{type: String, required: true, max: 100},
    user_lastName: {type: String, required: true, max: 100},
    user_email: String,
    lastModifiedDate: { type: String, default: Date.now }
});


const User = mongoose.model('User', UserSchema);

module.exports = User;

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: String,
    username: String,
    password: String,
});

module.exports = model('User', userSchema);
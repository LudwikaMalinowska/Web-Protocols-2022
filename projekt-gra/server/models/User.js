const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: String,
    username: String
});

module.exports = model('User', userSchema);
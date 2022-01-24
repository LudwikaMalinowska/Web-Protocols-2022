const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    gameId: String,
    gameName: String,
    // users: [{type: Schema.ObjectId, ref: 'User'}]
    users: Array
});

module.exports = model('Game', gameSchema);
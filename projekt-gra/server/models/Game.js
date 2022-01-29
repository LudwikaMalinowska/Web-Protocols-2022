const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    gameId: String,
    gameName: String,
    // users: [{type: Schema.ObjectId, ref: 'User'}]
    users: Array,
    moves: Array,
    board: Object
});

module.exports = model('Game', gameSchema);
const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    gameId: String,
});

module.exports = model('Game', gameSchema);
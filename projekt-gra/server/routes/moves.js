const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Game = require("../models/Game");
const User = require("../models/User");




router.get('/:gameId/moves', async (req, res) => {
    const gameId = req.params.gameId;
    const query = Game.findOne({"gameId": gameId});
    query.exec(function (err, game) {
      if (err) throw err;
      return res.send({
        moves: game.moves
      });
    })
});




router.post('/:gameId/moves', async (req, res) => {

    const gameId = req.params.gameId;
    const move = req.body;
    const query = Game.findOne({"gameId": gameId});

    query.exec(function (err, game) {
        if (err) throw err;
      
        const newMoves = [...game.moves];
        newMoves.push(move);

        const updatedGame = await Game.findOneAndUpdate({"gameId": gameId}, {$set: {"moves": newMoves}})
        .catch(err => console.log(err));

        return res.send(updatedGame);
    })

});

router.delete('/:gameId/moves', async (req, res) => {
    const gameId = req.params.gameId;
    const query = Game.findOne({"gameId": gameId});

    query.exec(function (err, game) {
        if (err) throw err;
      
        const newMoves = [...game.moves];
        newMoves.pop();

        const updatedGame = await Game.findOneAndUpdate({"gameId": gameId}, {$set: {"moves": newMoves}})
        .catch(err => console.log(err));

        return res.send(updatedGame);
    })
})






module.exports = router;
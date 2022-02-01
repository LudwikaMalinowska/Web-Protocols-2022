const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Game = require("../models/Game");
const User = require("../models/User");




router.get('/:gameId/moves', async (req, res) => {
    const gameId = req.params.gameId;
    const query = Game.findOne({"gameId": gameId});
    query.exec(function (err, game) {
      if (err) console.log(err);

      if (game !== null) {
        return res.send({
            moves: game.moves
          });
      }
      else {
        // console.log("Game not found");
        res.status(404).json({error: "Game not found"})
      }
      
    })
});




router.post('/:gameId/moves', async (req, res) => {

    const gameId = req.params.gameId;
    const move = req.body;
    const query = Game.findOne({"gameId": gameId});

    query.exec(async function (err, game) {
        if (err) console.log(err);
      
        const newMoves = [...game.moves];
        newMoves.push(move);

        const updatedGame = await Game.findOneAndUpdate({"gameId": gameId}, {$set: {"moves": newMoves}})
        .catch(err => console.log(err));

        // console.log(updatedGame.moves);

        return res.send({move: move});
    })

});

router.delete('/:gameId/moves', async (req, res) => {
    const gameId = req.params.gameId;
    const query = Game.findOne({"gameId": gameId});

    query.exec(async function (err, game) {
        if (err) console.log(err);
      
        if (game !== null){
            const newMoves = [...game.moves];
            newMoves.pop();
    
            const updatedGame = await Game.findOneAndUpdate({"gameId": gameId}, {$set: {"moves": newMoves}})
            .catch(err => console.log(err));
    
            // console.log("nm", newMoves)
            return res.send({moves: newMoves});
        }
        
    })
})






module.exports = router;
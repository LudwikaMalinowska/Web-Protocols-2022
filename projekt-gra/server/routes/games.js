const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Game = require("../models/Game");

router.get('/', async (req, res) => {
    const query = Game.find({});
    query.exec(function (err, games) {
      if (err) throw err;
      return res.send({
        allGames: games
      });
    })
  });

router.post('/', async (req, res) => {
  const newGame = new Game({
    "gameId": req.body.gameId,
  });
  console.log("ngame", newGame)
  newGame.save()
  .then(result => {
    console.log("added game: ", result);
    return res.send(result);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

router.delete('/:gameId', async (req, res) => {
  const gameId = req.params.gameId;
  const query = Game.deleteOne({"gameId": gameId});
  query.exec(function (err, game) {
    if (err) console.log(err);
    if (game !== null){
      console.log(`Pokój o id: ${gameId} usunięty.`)
      return res.send(game);
    } else {
      console.log("Game not found");
      res.status(404).json({error: "Game not found"})
    }
  })
})


module.exports = router;
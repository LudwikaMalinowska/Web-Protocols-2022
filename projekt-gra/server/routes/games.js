const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Game = require("../models/Game");
const User = require("../models/User");

router.get('/', async (req, res) => {
    const query = Game.find({});
    query.exec(function (err, games) {
      if (err) throw err;
      return res.send({
        allGames: games
      });
    })
  });

router.get('/:gameId', async (req, res) => {
  // return res.send({});
  const gameId = req.params.gameId;
  const query = Game.findOne({"gameId": gameId})
  query.exec(function (err, game) {
    if (err) throw err;
    if (game !== null)
      return res.send(game);
    else {
      console.log("Game not found");
      res.status(404).json({error: "Game not found"})
    }
  })
});


router.post('/', async (req, res) => {
  const newGame = new Game({
    "gameId": req.body.gameId,
    "gameName": req.body.gameName || "Bez Nazwy"
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

router.put("/:gameId", async (req, res) => {
  console.log("---put")
  const gameId = req.params.gameId;
  const updatedGame = {
    "gameName": req.body.gameName
  }
  const query = Game.findOneAndUpdate({"gameId": gameId}, {
    $set: updatedGame
  });
  query.exec(function (err, game) {
    if (err) console.log(err);
    if (game !== null) {
      return res.send({
        ...updatedGame,
        "gameId": gameId
      });
    }
    else {
      console.log("Game not found");
      res.status(404).json({error: "Game not found"})
    }
  })
})



module.exports = router;
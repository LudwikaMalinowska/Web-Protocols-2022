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

router.get('/searchName', async (req, res) => {
  const searchedName = req.query.name;
  const query = Game.find({"gameName" : {$regex : searchedName}});

  query.exec(function (err, games) {
    if (err) throw err;
    return res.send({
      games: games
    })
  })
})

router.get('/searchId', async (req, res) => {
  const searchedId = req.query.id;
  const query = Game.find({"gameId" : {$regex : searchedId}});

  query.exec(function (err, games) {
    if (err) throw err;
    return res.send({
      games: games
    })
  })
})

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
  console.log(req.body.board);
  const newGame = new Game({
    "gameId": req.body.gameId,
    "gameName": req.body.gameName || "Bez Nazwy",
    "gameUsers": [],
    "moves": [],
    "board": req.body.board,
    "playerTurn": "player1"
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
  // const updatedGame = {
  //   "gameName": req.body.gameName
  // }

  const query = Game.findOneAndUpdate({"gameId": gameId}, {$set: req.body});

  query.exec(function (err, game) {
    if (err) console.log(err);
    if (game !== null) {
      return res.send(game);
    }
    else {
      console.log("Game not found");
      res.status(404).json({error: "Game not found"})
    }
  })
})


router.get('/:gameId/board', async (req, res) => {
  const gameId = req.params.gameId;
  const query = Game.findOne({"gameId": gameId});
  query.exec(function (err, game) {
    if (err) console.log(err);

    if (game !== null) {
      return res.send({
          board: game.board
        });
    }
    else {
      console.log("Game not found");
      res.status(404).json({error: "Game not found"})
    }
    
  })
});

router.put("/:gameId/board", async (req, res) => {
  console.log("---put")
  const gameId = req.params.gameId;
  const board = req.body;

  const game = await Game.findOne({"gameId": gameId})
  .catch(err => console.log(err));
  const updatedGame = {
    ...game,
    board: board
  }
  console.log(updatedGame.board)
  
  const query = Game.findOneAndUpdate({"gameId": gameId}, {
    $set: {"board": board}
  });
  query.exec(function (err, game) {
    if (err) console.log(err);
    if (game !== null) {
      return res.send({board: board});
    }
    else {
      console.log("Game not found");
      res.status(404).json({error: "Game not found"})
    }
  })
})



module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Game = require("../models/Game");
const User = require("../models/User");


// /games/:gameId/users
router.get('/:gameId/users', async (req, res) => {
    const gameId = req.params.gameId;
    console.log("gid", gameId);

    const game = await Game.findOne({"gameId": gameId})
    .catch(err => console.log(err));
    
    console.log(game);

    if (game !== null) {
      console.log(game.users);
      res.send({users: game.users})
    } else {
      res.send({error: "Game doesn't exist"});
    }
    
  });

// /games/:gameId/users
router.post('/:gameId/users', async (req, res) => {
    const gameId = req.params.gameId;
    console.log(gameId);
    const userId = req.body.userId;
    console.log(userId);



    const gameUser = await User.findOne({"userId": userId})
    .catch(err => console.log(err));
  
    if (gameUser !== null) {
      const updatedGame = await Game.findOneAndUpdate({"gameId": gameId}, {$push: {users: gameUser}}
      // {runValidators: true, overwrite: false, new: true}
      )
      .catch(err => console.log(err));

      console.log("added user to game: ", userId);
      return res.send(gameUser);
    }
    else {
      console.log("User not found");
      res.status(404).json({error: "User not found"})
    }
    
  
    
  });

router.delete('/:gameId/users/:userId', async (req, res) => {
  const gameId = req.params.gameId;
  const userId = req.params.userId;
  console.log(gameId);

  const game = await Game.findOne({"gameId": gameId});
  const newUsers = game.users.filter(user => user.userId !== userId);
  console.log(newUsers);
  const updatedGame = await Game.findOneAndUpdate({"gameId": gameId}, {$set: {users: newUsers}}
  // {runValidators: true, overwrite: false, new: true}
  )
  .catch(err => console.log(err));

  console.log("removed user from game: ", userId);
  return res.send(userId);
});


module.exports = router;
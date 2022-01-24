const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Game = require("../models/Game");
const User = require("../models/User");


// /games/:gameId/users
router.get('/:gameId/users', async (req, res) => {
    const gameId = req.params.gameId;
    console.log(gameId);
    const query = User.find({});

    query.exec(function (err, users) {
        if (err) console.log(err);

        return res.send({
            gameId: gameId,
            gameUsers: users
        });
    })
  });

// /games/:gameId/users
router.post('/:gameId/users', async (req, res) => {
    const gameId = req.params.gameId;
    console.log(gameId);
    const user = req.body;
    console.log(user);
    const gameUser = await User.create({
      "userId": user.userId,
      "username": user.username
    })
    .catch(err => console.log(err));
  
    const updatedGame = await Game.findOneAndUpdate({"gameId": gameId}, {$push: {users: gameUser}}
    // {runValidators: true, overwrite: false, new: true}
    )
    .catch(err => console.log(err));
  
    console.log("added user to game: ", user);
    return res.send(gameUser);
  });


module.exports = router;
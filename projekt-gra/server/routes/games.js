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


module.exports = router;
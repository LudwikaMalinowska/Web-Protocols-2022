const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Game = require("../models/Game");
const User = require("../models/User");




router.get('/', async (req, res) => {
    const query = User.find({});
    query.exec(function (err, users) {
      if (err) console.log(err);
      return res.send({
        allUsers: users
      });
    })
  });

router.get('/:userId', async (req, res) => {
  // return res.send({});
  const userId = req.params.userId;
  const query = User.findOne({"userId": userId})
  query.exec(function (err, user) {
    if (err) console.log(err);
    if (user !== null)
      return res.send(user);
    else {
      // console.log("User not found");
      res.status(404).json({error: "User not found"})
    }
  })
});


router.post('/', async (req, res) => {
  const newUser = new User({
    "userId": req.body.userId,
    "username": req.body.username,
    "password": req.body.password
  });
  //console.log("ngame", newGame)
  newUser.save()
  .then(result => {
    // console.log("added user: ", result);
    return res.send(result);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

router.delete('/:userId', async (req, res) => {
  // console.log("delete")
  const userId = req.params.userId;
  // console.log(userId)
  const query = User.deleteOne({"userId": userId});
  query.exec(function (err, user) {
    if (err) console.log(err);
    if (user !== null){
      // console.log(`User o id: ${userId} usunięty.`)
      return res.send(user);
    } else {
      // console.log("User not found");
      res.status(404).json({error: "User not found"})
    }
  })
})

router.put("/:userId", async (req, res) => {
  // console.log("---put")
  const userId = req.params.userId;
  const updatedUser = {
    "username": req.body.username
  }
  const query = User.findOneAndUpdate({"userId": userId}, {
    $set: updatedUser
  });
  query.exec(function (err, user) {
    if (err) console.log(err);
    if (user !== null) {
      return res.send({
        ...updatedUser,
        "userId": userId
      });
    }
    else {
      // console.log("User not found");
      res.status(404).json({error: "User not found"})
    }
  })
})




module.exports = router;
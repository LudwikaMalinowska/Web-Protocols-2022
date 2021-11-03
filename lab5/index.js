const express = require("express");
const app = express();
const game = require("./game");
require("dotenv").config();

app.use(express.json());
app.use("/game", game);

const client = require("./config/redisClient");




client.on("error", err => {
    console.error("Error connecting to Redis", err);
  });
client.on("connect", () => {
    console.log(`Connected to Redis.`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
    });
});
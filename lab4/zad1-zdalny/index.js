const express = require("express");
const app = express();
const port = 3210;

app.get("/", (req, res) => {
    res.send("zdalny: get");
});

app.post("/", (req, res) => {
    res.send("zdalny: post");
});


app.listen(port, () => {
    console.log(`Aplikacja Express.js działa na portcie ${port}`);
});
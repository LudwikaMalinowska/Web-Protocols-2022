const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("get");
});

app.post("/", (req, res) => {
    res.send("post");
});


app.listen(port, () => {
    console.log(`Aplikacja Express.js działa na portcie ${port}`);
});
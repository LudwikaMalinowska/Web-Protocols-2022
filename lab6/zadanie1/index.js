const express = require("express");
const app = express();
const port = 5000;
const Cookies = require('js-cookie')



app.get("/", (req, res) => {

    // Cookies.set('name', 'value', { expires: 7 })
    // res.header()
    res.cookie("name", "value", {maxAge: 7 * 24 * 60 * 60 * 1000})
    res.cookie("key", "abc", {maxAge: 7 * 24 * 60 * 60 * 1000})

    res.send("Hello world")
    
});

app.post("/", (req, res) => {
    res.send("post");
});


app.listen(port, () => {
    console.log(`Aplikacja Express.js działa na portcie ${port}`);

    
});
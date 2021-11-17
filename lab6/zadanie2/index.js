const express = require("express");

const port = 5000;
const Cookies = require('js-cookie')
var cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {

    // const cookies = req.cookies;
    // console.log(cookies);

    res.cookie("key1", "value", {maxAge: 7 * 24 * 60 * 60 * 1000})
    res.cookie("key", "abc", {maxAge: 7 * 24 * 60 * 60 * 1000})

    const cookies = req.cookies;
    console.log(cookies);

    if (cookies.surname === undefined) {
        // const name = alert("Podaj imię i nazwisko")
        // res.cookie("name", name);
    }
    else {
        return res.send(`Witaj ${cookies.name}`)
    }


    return res.send("Hello world")
    
});

app.post("/", (req, res) => {
    res.send("post");
});


app.listen(port, () => {
    console.log(`Aplikacja Express.js działa na portcie ${port}`);

    
});
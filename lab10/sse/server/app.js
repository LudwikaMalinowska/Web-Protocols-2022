'use strict';
const connect = require("connect");
var express = require('express');
const SseChannel = require('sse-channel');
const app = connect();

// const adv = require('./advertising')
// app.use(express.json());
// app.use("/", adv);


const httpServer = require('http').createServer(app);


const dateChannel = new SseChannel();
const advChannel = new SseChannel();


const reklamy = {
    "advertising": [{
      "id": 0,
      "description": "mgr Łukasz Mielewczyk\nKorepetycje z informatyki.\nKontakt: lukasz.mielewczyk@ug.edu.pl"
    }, {
      "id": 1,
      "description": "Andrzej Nowak\nDarmowa wycena samochodu w 5 sekund\nUsługa kosztuje 100 zł"
    }, {
      "id": 2,
      "description": "Zakład pogrzebowy w Gdańsku\n10 lat doświadczenia w obsłudze i organizacji pogrzebów"
    }, {
      "id": 3,
      "description": "Schronisko i hotel dla zwierząt\nSopot ul. Sopocka 14\npn.-pt. 8:00-16:00"
    }, {
      "id": 4,
      "description": "Nauka języka online\nDarmowe kursy internetowe\nhttps://www.kursy-jezykowe.pl/"
    }, {
      "id": 5,
      "description": "Najlepszy i darmowy hosting internetowy\nWięcej na: https://www.hosting.pl/"
    }]
}

app.use(function(req, res, next) {
 res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
 res.setHeader("Connection", "keep-alive");
 res.setHeader("Cache-Control", "no-cache");
 res.setHeader("Content-Type", "text/event-stream");
 next();
});

app.use(function(req, res) {
 if (req.url.indexOf('/events/datetime') === 0) {
  dateChannel.addClient(req, res);
 } 
 else if (req.url.indexOf('/events/advertisement') === 0) {
    advChannel.addClient(req, res);
}
 else {
  res.writeHead(404);
  res.end();
 }
});






setInterval(function broadcastDate() {
 dateChannel.send((new Date()).toISOString());

}, 5000);

setInterval(function showAdvertisement(){
    
    const index = Math.floor(Math.random() * 5)
    const reklama = reklamy.advertising[index].description;
    advChannel.send(reklama);
}, 2000)


httpServer.listen(7000, function() {
 console.log('Serwer HTTP działa na pocie 7000');
});
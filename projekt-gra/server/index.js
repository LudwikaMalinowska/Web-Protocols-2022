const connect = require("connect");
const express = require('express');
const app = connect();

const httpServer = require('http').createServer(app);

httpServer.listen(7000, function() {
    console.log('Serwer HTTP działa na pocie 7000');
   });


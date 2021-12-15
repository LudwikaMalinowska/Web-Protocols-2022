'use strict';
const connect = require("connect");
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require("http").createServer(app);

app.use(serveStatic("public"));

httpServer.listen(3000, function () {
 console.log('Serwer HTTP działa na pocie 3000');
});

'use strict';
var connect = require("connect");
var app = connect();
var serveStatic = require('serve-static');

var httpServer = require("http").createServer(app);

app.use(serveStatic("public"));

const io = require('socket.io')(httpServer,{
    cors: {    
    origin: "http://localhost:3000",    
    methods: ["GET", "POST"],    
    allowedHeaders: ["my-custom-header"],    
    credentials: true  }
});
// io.on('connection', client => {
//   client.on('event', data => { 
//       console.log("event")
//   });
//   client.on('disconnect', () => { 
//       console.log("disconnect")
//   });
// });

io.on("connection", (socket) => {  
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

httpServer.listen(8080, function () {
    console.log('Serwer HTTP działa na pocie 8080');
});





// httpServer.listen(3000, function () {
//     console.log('Serwer HTTP działa na pocie 3000');
// });

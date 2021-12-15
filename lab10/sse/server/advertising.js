var express = require('express');
const router = express.Router({mergeParams: true});

var sse = require('server-sent-events');


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


// router.get('/events', sse, function(req, res) {
//     // res.sse is made available via the middleware
//     const index = Math.floor(Math.random() * 5)
//     const reklama = reklamy.advertising[index].description;
//     console.log(reklamy);
//     console.log(reklama);

//     res.sse('data: im from the server\n\n');
// });


module.exports = router;
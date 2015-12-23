var fs = require('fs');
fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var housesVisited = { "0,0" : 2};
    var santa = {x : 0, y : 0};
    var robot = {x : 0, y : 0};
    for (var i = 0; i < data.length; i++) {
        var deliverer = i % 2 == 0 ? santa : robot ;
        updateCoords(deliverer, data.charAt(i)); 
        var houseVector = deliverer.x + "," + deliverer.y;
        housesVisited[houseVector] = housesVisited[houseVector] ?
            housesVisited[houseVector] + 1 : 1;
    }
    console.log(Object.keys(housesVisited).length);
});

function updateCoords(santa, dir) {
    switch (dir) {
        case '>': santa.x++; break;
        case '<': santa.x--; break;
        case 'v': santa.y--; break;
        case '^': santa.y++; break;
    }
}
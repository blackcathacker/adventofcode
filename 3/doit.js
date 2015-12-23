var fs = require('fs');
fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var housesVisited = { "0,0" : 1};
    var currentX = 0;
    var currentY = 0;
    for (var i = 0; i < data.length; i++) {
        switch (data.charAt(i)) {
            case '>': currentX++; break;
            case '<': currentX--; break;
            case 'v': currentY--; break;
            case '^': currentY++; break;
        }
        var houseVector = currentX + "," + currentY;
        housesVisited[houseVector] = housesVisited[houseVector] ?
            housesVisited[houseVector] + 1 : 1;
    }
    console.log(Object.keys(housesVisited).length);
});

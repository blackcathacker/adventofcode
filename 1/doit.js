var fs = require('fs');
fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var floor = 0;
    for (var i = 0, char; i< data.length; i++) {
        if (data.charAt(i) == '(') floor++;
        else if (data.charAt(i) == ')') floor--;
        if (floor < 0) {
            console.log(i);
        }
    }
    console.log('Floor ' + floor);
});
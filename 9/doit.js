var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    
    var pattern = /([a-zA-Z]+) to ([a-zA-Z]+) = ([0-9]+)/;
    var map = {};
    data.split('\n').forEach((line) => {
        var parts = pattern.exec(line);
        if (!(parts[1] in map)) {
            map[parts[1]] = {};
        }
        if (!(parts[2] in map)) {
            map[parts[2]] = {};
        }
        
        map[parts[1]][parts[2]] = parts[3];
        map[parts[2]][parts[1]] = parts[3];
    });
    
    //console.log(map);
    
    var permutations = permute(Object.keys(map));
    var minimum = Number.MAX_VALUE;
    var max = 0;
    permutations.forEach((list) => {
        var currentTotal = 0;
        for (var i = 0; i < list.length - 1; i++) {
            currentTotal += Number.parseInt(map[list[i]][list[i+1]]);
        }
        if (currentTotal < minimum) { minimum = currentTotal; }
        if (currentTotal > max) { max = currentTotal; }
    });
    console.log(minimum);
    console.log(max);
});

function permute(list, result, totals) {
    if (!result) result = [];
    if (!totals) totals = [];
    for (var i = 0; i < list.length; i++) {
        var newResult = result.slice();
        var newList = list.slice();
        newResult.push(newList.splice(i, 1)[0]);
        if (newList.length == 0) {
            totals.push(newResult);
        } else {
            permute(newList, newResult, totals);
        }
    }
    return totals;
}
  

var fs = require('fs');
fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var totalArea = 0;
    var ribbonLength = 0;
    data.split('\n').forEach((line) => {
        var dimensions = line.split('x');
        totalArea += calculatepresentArea(dimensions);
        ribbonLength += calculateRibbons(dimensions);
    });
    console.log(totalArea);
    console.log(ribbonLength);
});

function calculatepresentArea(dims) {
    var side1 = dims[0] * dims[1];
    var side2 = dims[1] * dims[2];
    var side3 = dims[0] * dims[2];
    
    var extra = Math.min(side1, side2, side3);
    
    return 2*side1 + 2*side2 + 2*side3 + extra;
}

function calculateRibbons(dims) {
    dims.sort((a, b) => a - b);
    console.log(dims);
    return (dims[0]*dims[1]*dims[2]) + (dims[0]*2 + dims[1]*2);
}
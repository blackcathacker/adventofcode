var fs = require('fs');
var SIZE = 1000;
fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var lights = new Array(SIZE);
    for (var x = 0; x < SIZE; x++) {
        lights[x] = new Array(SIZE);
        for (var y = 0; y < SIZE; y++) {
            lights[x][y] = 0;
        }
    }
    
    data.split('\n').forEach((line) => {
        processLine(line, lights);
    });
    //printLights(lights);
    //processLine('turn on 0,0 through 9,9', lights);
    //printLights(lights);

    var totalLightsOn = 0;
    for (var x = 0; x < SIZE; x++) {
        for (var y = 0; y < SIZE; y++) {
            if (lights[x][y]) totalLightsOn++;
        }
    }
    console.log(totalLightsOn);
    console.log(lights.reduce((current, item) => { 
        return current + item.reduce((current, item) => {
            return current + item;
        });
        }, 0), 0);
});

function printLights(lights) {
    console.log('----------');
    for (var x = 0; x < SIZE; x++) {
        console.log(lights[x].reduce((current, item) => {
            return current + (item ? '*' : '.');
        }, ''));
    }
}

function processLine(line, lights) {
    var commandRegex = new RegExp("(.*) ([0-9,]+) through ([0-9,]+)");
    var result = commandRegex.exec(line);
    var command = result[1];
    var startArr = result[2].split(',');
    var endArr = result[3].split(',');
    var action = (lights, x, y) => { };
    if (command == 'toggle') { action = toggle; }
    else if (command == 'turn on') { action = turnOn; }
    else if (command == 'turn off') { action = turnOff; }
    var startX = Math.min(startArr[0], endArr[0]);
    var endX = Math.max(startArr[0], endArr[0]);
    var startY = Math.min(startArr[1], endArr[1]);
    var endY = Math.max(startArr[1], endArr[1]);
    for (var x = startX; x <= endX; x++) {
        for (var y = startY; y <= endY; y++) {
            action(lights, x, y);
        }
    }
}

function turnOn(lights, x, y) { lights[x][y] = lights[x][y]+1; }
function turnOff(lights, x, y) { lights[x][y] = lights[x][y] > 0 ? lights[x][y]-1 : 0 }
function toggle(lights, x, y) { lights[x][y] = lights[x][y]+2; }

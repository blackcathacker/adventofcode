var fs = require('fs');
fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var wires = { };
    
    data.split('\n').forEach((line) => {
        processLine(line, wires);
    });
    
    var originalWires = Object.assign({}, wires);
    
    var a = computeValue(wires, 'a');
    
    console.log('a -> ' + a);
    
    wires = Object.assign({}, originalWires, {b : a});
    
    var a = computeValue(wires, 'a');
    
    console.log('a -> ' + a);
    
});

function computeValue(wires, wire) {
    var value = wires[wire];
    if (Number.isInteger(value) || value.match(/^[0-9]+$/)) {
        return Number.parseInt(value);
    } else if (value.match(/^[a-z]+$/)) {
        return computeValue(wires, value);
    } else {
        var lhs, rhs, op;
        var parts = /([0-9a-z]+)?\s?([A-Z]+) ([0-9a-z]+)/.exec(value);
        console.log(parts);
        if (parts[1]) {
            if (parts[1].match(/^[0-9]+$/)) {
                lhs = Number.parseInt(parts[1]);
            } else {
                lhs = computeValue(wires, parts[1]);
            }
        }
        op = parts[2];
        if (parts[3].match(/^[0-9]+$/)) {
            rhs = Number.parseInt(parts[3]);
        } else {
            rhs = computeValue(wires, parts[3]);
        }
        
        wires[wire] = executeOp(lhs, op, rhs);
        return wires[wire];
    }
}

function executeOp(lhs, op, rhs) {
    switch (op) {
        case 'NOT':
            return ~ rhs;
        case 'AND':
            return lhs & rhs;
        case 'OR':
            return lhs | rhs;
        case 'XOR':
            return lhs ^ rhs;
        case 'LSHIFT':
            return lhs << rhs;
        case 'RSHIFT':
            return lhs >> rhs;
        default:
            console.log('unrecognized op');
    }
}

function processLine(line, wires) {
    var parts = line.split('->').map(item => item.trim());
    wires[parts[1]] = parts[0];
}

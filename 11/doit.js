
var result = '';

var input = 'hxbxwxba';

var result = input;
while(true) {
    result = increment(result);
    if (matchesReqs(result))
        console.log(result);
}

function increment(str) {
    var input = str;
    var increment = true;
    for (var i = input.length - 1; i >= 0; i--) {
        var charCode = input.charCodeAt(i);
        if (charCode !== 122) {
            input = input.substring(0, i) + String.fromCharCode(charCode+1) + input.substring(i+1);
            increment = false;
            break;
        } else if (charCode === 122) {
            input = input.substring(0, i) + String.fromCharCode(97) + input.substring(i+1);
        }
    }
    if (increment) {
        input = 'a' + input;
    }
    return input;
}
    
    
function matchesReqs(input) {
    var prevPrev, prev;
    var hasStraight = false;
    var hasIOL = false;
    var doubleCount = 0;
    for (var i = 0; i < input.length; i++) {
        var cur = input.charCodeAt(i);
        if (prevPrev+2 == prev+1 && prev+1 == cur) {
            hasStraight = true;
        }
        if (prevPrev !== prev && prev === cur) { 
            doubleCount++;
        }
        if (cur === 105 || cur === 108 || cur === 111) {
            hasIOL = true;
        }
        prevPrev = prev;
        prev = cur; 
    }
    return hasStraight && !hasIOL && doubleCount >= 2;
}


var fs = require('fs');
fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var numberOfNice = 0;
    data.split('\n').forEach((word) => { if (isNice(word)) numberOfNice++; });
    console.log(numberOfNice);
});

var vowels = ['a', 'e', 'i', 'o', 'u'];

function isNice(str) {
    var prevPrevLetter = undefined;
    var previousLetter = undefined;
    var twoLetterPatterns = [];
    var twopair = false;
    var repeated = false;
    for (var i = 0; i < str.length; i++) {
        var char = str.charAt(i);
        if (twoLetterPatterns.indexOf(previousLetter + char) >= 0 && prevPrevLetter != char) { 
            twopair = true;
        }
        twoLetterPatterns.push(previousLetter + char);
        if (prevPrevLetter == char) {
            repeated = true;
        }
        previousLetter = char;
        prevPrevLetter = previousLetter;
    }
    return twopair && repeated;
}

var fs = require('fs');
fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var numberOfNice = 0;
    data.split('\n').forEach((word) => { if (isNice(word)) numberOfNice++; });
    console.log(numberOfNice);
});

var vowels = ['a', 'e', 'i', 'o', 'u'];

function isNice(str) {
    var numVowels = 0;
    var previousLetter = undefined;
    var doubleLetter = false;
    for (var i = 0; i < str.length; i++) {
        var char = str.charAt(i);
        if (vowels.indexOf(char) >= 0) numVowels++;
        if (previousLetter == char) doubleLetter = true;
        if (previousLetter == 'a' && char == 'b') return false;
        if (previousLetter == 'c' && char == 'd') return false;
        if (previousLetter == 'p' && char == 'q') return false;
        if (previousLetter == 'x' && char == 'y') return false;
        previousLetter = char;
    }
    return numVowels >= 3 && doubleLetter;
}

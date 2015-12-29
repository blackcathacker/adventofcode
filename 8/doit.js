var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var codeLength = 0;
    var strLength = 0;
    
    var encodedCodeLength = 0;
    
    data.split('\n').forEach((line) => {
        codeLength += line.length;
        strLength += eval(line).length;
        
        var reline = line;
        reline = reline.replace(/\\/g, "\\\\");
        reline = reline.replace(/"/g, "\\\"");
        reline = '"' + reline + '"';
        console.log(line + ' -> ' + reline);
        encodedCodeLength += reline.length;

    });
    
    console.log("Code length = " + codeLength);
    console.log("String length = " + strLength);
    console.log("Result = " + (codeLength - strLength));
    
    console.log("Encoded length = " + encodedCodeLength);
    console.log("Result 2 = " + (encodedCodeLength - codeLength));
});
  

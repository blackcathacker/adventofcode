
var result = '';

var input = '1321131112';

var result = input;
for (var i = 0; i < 50; i++) {
    result = process(result);
}
console.log(result.length);

function process(input) {
    var result = '';
    var num;
    var count;
    for (var i = 0; i < input.length; i++) {
        if (num != input.charAt(i)) {
            if (num) {
                result += count.toString() + num.toString();
            }
            num = input.charAt(i);
            count = 1;
        } else if (num == input.charAt(i)) {
            count++;
        }
    }
    result += count.toString() + num.toString();
    return result;
}
const { readByLine } = require('../util');

const matchingTags = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>'
}

const errorPoints = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

function findInvalidCharacter(line) {
    const stack = []
    for (let tag of line) {
        if (matchingTags[tag]) stack.unshift(matchingTags[tag])
        else if (tag === stack[0]) stack.shift()
        else return { invalid: true, invalidTag: tag }
    }
    return { valid: true, stack }
}

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(l => l.split(''));
    const results = input.map(findInvalidCharacter).filter(i => !i.valid).map(i => errorPoints[i.invalidTag]).reduce((acc, n) => acc + n, 0)
    console.log(results)
}

const incompletePoints = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

async function runSecond() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(l => l.split(''));
    const results = input.map(findInvalidCharacter).filter(i => i.valid).map(i => i.stack)
    console.log(results)
    const scores = results.map(r => {
        return r.reduce((acc, c) => acc = (acc * 5) + incompletePoints[c], 0)
    }).sort((a, b) => a - b)
    console.log(scores)
    console.log(scores[Math.floor(scores.length / 2)])

}


runFirst().then(runSecond).then(() => console.log('finished'))
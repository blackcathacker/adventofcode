const { readByLine } = require('../util');

function execPolymer(string, polymers) {
    const splitStr = string.split('')
    let result = ''
    for (let i = 0; i < splitStr.length - 1; i++) {
        // console.log(splitStr[i] + splitStr[i+1])
        result += splitStr[i] + polymers[splitStr[i] + splitStr[i+1]]
    }
    result += splitStr[splitStr.length - 1]
    return result
}

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`));
    const initialString = input[0]
    const polymers = input.slice(2).reduce((acc, l) => {
        const parsed = /([A-Z]*) -> ([A-Z])/.exec(l)
        acc[parsed[1]] = parsed[2]
        return acc
    }, {})
    // console.log(initialString, polymers)
    let result = initialString
    for (let i = 0; i < 10; i++) {
        result = execPolymer(result, polymers)
        // console.log(result)
    }
    const charCounts = result.split('').reduce((acc, c) => {
        if (!acc[c]) acc[c] = 1
        else acc[c]++
        return acc
    }, {})
    // console.log(charCounts)
    const sortedEntries = Object.entries(charCounts).sort((entry1, entry2) => entry2[1] - entry1[1])
    // console.log(sortedEntries)
    console.log(sortedEntries[0][1] - sortedEntries[sortedEntries.length - 1][1])
}

function parseString(initialString) {
    let polymerMap = {}
    initialStringSplit = initialString.split('')
    for (let i = 0; i < initialStringSplit.length - 1; i++) {
        const key = `${initialStringSplit[i]}${initialStringSplit[i+1]}` 
        if (!polymerMap[key]) polymerMap[key] = 1
        else polymerMa[key]++
    }
    return polymerMap
}

function addPair(map, key, val) {
    if (!map[key]) map[key] = val
    else map[key] += val
}

function runIteration(current, polymers) {
    return Object.keys(current).reduce((acc, k) => {
        //console.log(acc, k)
        const value = current[k]
        const firstPair = `${k.split('')[0]}${polymers[k]}`
        const secondPair = `${polymers[k]}${k.split('')[1]}`
        addPair(acc, firstPair, value)
        addPair(acc, secondPair, value)
        return acc
    }, {})
}

async function runSecond() {
    const input = (await readByLine(`${__dirname}/input.txt`));
    const initialString = parseString(input[0])
    const polymers = input.slice(2).reduce((acc, l) => {
        const parsed = /([A-Z]*) -> ([A-Z])/.exec(l)
        acc[parsed[1]] = parsed[2]
        return acc
    }, {})
    console.log(initialString, polymers)
    result = initialString
    for (let i = 0; i < 40; i++) {
        result = runIteration(result, polymers)
        // console.log(result)
    }
    console.log(result)

    const lastChar = input[0].charAt(input[0].length - 1)
    const totals = Object.keys(result).reduce((acc, key) => {
        addPair(acc, key.split('')[0], result[key])
        return acc
    }, {})
    addPair(totals, lastChar, 1)
    console.log(totals)
    const sortedEntries = Object.entries(totals).sort((entry1, entry2) => entry2[1] - entry1[1])
    // console.log(sortedEntries)
    console.log(sortedEntries[0][1] - sortedEntries[sortedEntries.length - 1][1])

}


runFirst().then(runSecond).then(() => console.log('finished'))
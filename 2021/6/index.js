const { readByLine } = require('../util');

function run(initial, days) {
    let final = initial
    for (let i = 0; i < days; i++) {
        final = doDay(final)
    }
    return final
}

function doDay(fishes) {
    const newFishes = {}
    for (let i = 1; i <= 8; i++) {
        newFishes[i - 1] = fishes[i] || 0
    }
    newFishes[8] = fishes[0]
    newFishes[6] += fishes[0] || 0
    return newFishes
}

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`))[0].split(',').map(Number);
    const fishes = input.reduce((acc, n) => {
        acc[n] = acc[n] ? acc[n] + 1 : 1
        return acc
    }, {})
    console.log(fishes)
    const final = run(fishes, 256)
    console.log(final)
    const total = Object.values(final).reduce((acc, n) => acc + n, 0)
    console.log(total)
}

async function runSecond() {

}


runFirst().then(runSecond).then(() => console.log('finished'))
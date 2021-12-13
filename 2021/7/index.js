const { readByLine } = require('../util');

function calculateFuel(positions, target) {
    return positions.reduce((acc, n) => Math.abs(n - target) + acc, 0)
}

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`))[0].split(',').map(Number);
    // const input = [16,1,2,0,4,2,7,1,2,14]
    let min = { fuel: Number.MAX_SAFE_INTEGER }
    for (let i = Math.min(...input); i <= Math.max(...input); i++) {
        const fuel = calculateFuel(input, i)
        if (fuel <= min.fuel) {
            min = { fuel, i }
        }
    }
    console.log(min)
}

function calculateIndividualFuel(pos, target) {
    const diff = Math.abs(pos - target)
    let total = 0
    for (let i = 1; i <= diff; i++) {
        total += i
    }
    return total
}

function calculateFuel2(positions, target) {
    return positions.reduce((acc, n) => calculateIndividualFuel(n, target) + acc, 0)
}

async function runSecond() {
    const input = (await readByLine(`${__dirname}/input.txt`))[0].split(',').map(Number);
    // const input = [16,1,2,0,4,2,7,1,2,14]
    let min = { fuel: Number.MAX_SAFE_INTEGER }
    for (let i = Math.min(...input); i <= Math.max(...input); i++) {
        const fuel = calculateFuel2(input, i)
        if (fuel <= min.fuel) {
            min = { fuel, i }
        }
    }
    console.log(min)
}


runFirst().then(runSecond).then(() => console.log('finished'))
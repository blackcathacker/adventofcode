const { readByLine } = require('../util');

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(Number);
    const { increases } = input.reduce(
        ({ prev, increases }, n) => {
            // console.log({ prev, n, increases, nextIncrease: increases + (n > prev ? 1 : 0) })
            return { prev: n, increases: increases + (n > prev ? 1 : 0) }
        },
        { prev: 100000, increases: 0 })
    console.log(increases)
}

async function runSecond() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(Number);
    let increases = 0, prev = Math.INFINITY
    for (let i = 0; i + 2 < input.length; i++) {
        const sum = input[i] + input[i + 1] + input[i + 2]
        // console.log(input[i], input[i + 1], input[i + 2], ' = ', sum, prev)
        if (sum > prev) { increases++ }
        prev = sum
    }

    console.log(increases)
}


runFirst().then(runSecond).then(() => console.log('finished'))
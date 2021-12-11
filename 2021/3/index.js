const { readByLine } = require('../util');

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`))
    const sums = input.reduce((acc, n) => n.split('').map((b, idx) => Number(acc[idx]) + Number(b)))
    const gamma = parseInt(sums.map(sum => sum > input.length / 2 ? 1 : 0).join(''), 2)
    const epsilon = parseInt(sums.map(sum => sum < input.length / 2 ? 1 : 0).join(''), 2)
    console.log(gamma, epsilon, gamma * epsilon)
}

async function runSecond() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(l => l.split('').map(Number))

    let matched = input
    for (let i = 0; i < input[0].length; i++) {
        const sumAtIdx = matched.reduce((acc, n) => n[i] + acc, 0)
        const picked = sumAtIdx >= matched.length / 2 ? 1 : 0
        matched = matched.filter(l => l[i] === picked)
        if (matched.length === 1) break
    }
    const oxygen = parseInt(matched[0].join(''), 2)

    matched = input
    for (let i = 0; i < input[0].length; i++) {
        const sumAtIdx = matched.reduce((acc, n) => n[i] + acc, 0)
        const picked = sumAtIdx >= matched.length / 2 ? 0: 1
        matched = matched.filter(l => l[i] === picked)
        if (matched.length === 1) break
    }
    let co2 = parseInt(matched[0].join(''), 2)

    console.log({ oxygen, co2 }, oxygen * co2)


}



runFirst().then(runSecond).then(() => console.log('finished'))
const { readByLine } = require('../util');

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`))
        .map(l => l.split(' | '))
        .map(l => l[1])
        .map(l => l.split(' '))
        .reduce((acc, o) => acc.concat(o), []);
    // console.log(input)
    const mapped = input.map(i => i.length)
    // console.log(mapped)
    const count = mapped.filter(n => [2, 3, 4, 7].includes(n)).length
    console.log(count)

}

function intersectionLength(output, signal) {
    return new Set(
        [...output].filter(x => signal.has(x))
    ).size
}

async function runSecond() {
    const input = (await readByLine(`${__dirname}/input.txt`))
        .map(l => l.split(' | '))
    const outputs = input.map(l => {
        const signal = l[0].split(' ')
        const output = l[1].split(' ')
        const sets = signal.reduce((acc, i) => 
        ({
            ...acc,
            [i.length]: new Set([
                ...i.split(''),
                ...(acc[i.length] || [])
            ])
        }), {})
        return output.map(o => {
            const chars = new Set(o.split(''))
            switch (o.length) {
                case 2: return 1
                case 3: return 7
                case 4: return 4
                case 7: return 8
                case 5:
                    if (intersectionLength(chars, sets[2]) === 2) return 3
                    if (intersectionLength(chars, sets[4]) === 3) return 5
                    return 2
                case 6:
                    if (intersectionLength(chars, sets[2]) === 1) return 6
                    if (intersectionLength(chars, sets[4]) === 4) return 9
                    return 0
            }
        }).join('')
    })
    console.log(outputs)
    const numbers = outputs.map(Number)
    console.log(numbers)
    const sum = numbers.reduce((acc, n) => acc + n, 0)
    console.log(sum)
    // const mapped = input.map(i => i.length)
    // console.log(mapped)
    // console.log(count)

}


runFirst().then(runSecond).then(() => console.log('finished'))
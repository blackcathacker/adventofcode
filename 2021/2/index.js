const { readByLine } = require('../util');

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(line => {
        const parsed = /([a-z]+) ([0-9]+)/.exec(line)
        return { op: parsed[1], count: Number(parsed[2]) }
    });
    const loc = input.reduce(({ horiz, depth }, { op, count }) => {
        if (op === 'forward') { return { horiz: horiz + count, depth } }
        if (op === 'down') { return { horiz, depth: depth + count } }
        if (op === 'up') { return { horiz, depth: depth - count } }
    }, { horiz: 0, depth: 0 })
    console.log(loc, loc.horiz * loc.depth)
}

async function runSecond() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(line => {
        const parsed = /([a-z]+) ([0-9]+)/.exec(line)
        return { op: parsed[1], count: Number(parsed[2]) }
    });
    const loc = input.reduce(({ horiz, depth, aim }, { op, count }) => {
        console.log({ op, count }, { horiz, depth, aim })
        if (op === 'forward') { return { horiz: horiz + count, depth: depth + (aim * count), aim } }
        if (op === 'down') { return { horiz, depth, aim: aim + count } }
        if (op === 'up') { return { horiz, depth, aim: aim - count } }
    }, { horiz: 0, depth: 0, aim: 0 })
    console.log(loc, loc.horiz * loc.depth)
}


runFirst().then(runSecond).then(() => console.log('finished'))
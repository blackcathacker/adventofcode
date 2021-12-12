const { readByLine } = require('../util');

function createPoint(p) {
    const coords = p.split(',')
    return { x: Number(coords[0]), y: Number(coords[1]) }
}

// distance(A, C) + distance(B, C) == distance(A, B)
/* function distance(p1, p2) {
    return (
        Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        )
    )
}

function onLine(x, y, l) {
    return distance(l.start, { x, y }) + distance(l.end, { x, y }) == distance(l.start, l.end)
}*/

function onLine(x, y, l) {
    return ((x >= l.start.x && x <= l.end.x) || (x <= l.start.x && x >= l.end.x)) &&
        ((y >= l.start.y && y <= l.end.y) || (y <= l.start.y && y >= l.end.y))
}

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`))
        .map(l => l.trim())
        .map(l => l.split(' -> '))
        .map(l => l.map(createPoint))
        .map(l => ({ start: l[0], end: l[1] }))
        .filter(l => l.start.x === l.end.x || l.start.y === l.end.y)
        //.filter((_, idx) => idx === 0)
        .reduce(
            (map, line) => map.map((l, y) => l.map((c, x) => onLine(x, y, line) ? c + 1 : c)),
            Array.from(Array(1000)).map(_ => Array.from(Array(1000)).map(() => 0)))
    // console.log(input.map(l => l.join('')).join('\n'))
    const count = input.reduce((acc, l) =>
        acc + l.reduce((acc, c) => c > 1 ? acc + 1 : acc, 0), 0)
    console.log(count)
    
}

async function runSecond() {
    const map = Array.from(Array(1000)).map(_ => Array.from(Array(1000)).map(() => 0))
    const input = (await readByLine(`${__dirname}/input.txt`))
        .map(l => l.trim())
        .map(l => l.split(' -> '))
        .map(l => l.map(createPoint))
        .map(l => ({ start: l[0], end: l[1] }))
        //.filter(l => l.start.x === l.end.x || l.start.y === l.end.y)
        //.filter((_, idx) => idx === 0)
    input.forEach(l => {
        let x = l.start.x
        let y = l.start.y
        // console.log(l)
        map[y][x] = map[y][x] + 1
        while (x !== l.end.x || y !== l.end.y) {
            //console.log({ x, y, l })
            if (x !== l.end.x) x < l.end.x ? x++ : x--
            if (y !== l.end.y) y < l.end.y ? y++ : y--
            map[y][x] = map[y][x] + 1
        }
    })
    //console.log(map.map(l => l.join('')).join('\n'))
    const count = map.reduce((acc, l) =>
        acc + l.reduce((acc, c) => c > 1 ? acc + 1 : acc, 0), 0)
    console.log(count)
}



runFirst().then(runSecond).then(() => console.log('finished'))
const { readByLine } = require('../util');

function getAdjacent(map, x, y) {
    const adjacent = []
    if (x > 0) adjacent.push(map[y][x - 1])
    if (x < map[y].length - 1) adjacent.push(map[y][x + 1])
    if (y > 0) adjacent.push(map[y - 1][x])
    if (y < map.length - 1) adjacent.push(map[y + 1][x])
    return adjacent
}

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(l => l.split('').map(Number));
    let total = 0
    for (let y = 0; y < input.length; y++) {
        const row = input[y]
        for (let x = 0; x < row.length; x++) {
            const level = input[y][x]
            const adjacent = getAdjacent(input, x, y)
            // console.log({ adjacent, level, x, y, min: Math.min(...adjacent)})
            if (Math.min(...adjacent) > level) total += level + 1
        }
    }

    console.log(total)

}

function findBasin(map, visitedSet, x, y) {
    if (visitedSet.has(`${x},${y}`)) return new Set()
    visitedSet.add(`${x},${y}`)
    if (y < 0 || y >= map.length) return new Set()
    const row = map[y]
    if (x < 0 || x >= map[y].length) return new Set()
    if (map[y][x] === 9) return new Set()
    const findBasinInner = findBasin.bind(null, map, visitedSet)
    // console.log({ x, y })
    return new Set([
        `${x},${y}`,
        ...findBasinInner(x, y - 1),
        ...findBasinInner(x, y + 1),
        ...findBasinInner(x - 1, y),
        ...findBasinInner(x + 1, y)
    ])
}

async function runSecond() {
    const map = (await readByLine(`${__dirname}/input.txt`)).map(l => l.split('').map(Number));
    let visitedSet = new Set()
    const basins = []
    for (let y = 0; y < map.length; y++) {
        const row = map[y]
        for (let x = 0; x < row.length; x++) {
            if (visitedSet.has(`${x},${y}`)) continue
            if (map[y][x] === 9) continue
            const newBasin = findBasin(map, visitedSet, x, y)
            // console.log(newBasin)
            basins.push(newBasin)
        }
    }
    basins.sort((a, b) => b.size - a.size)
    console.log(basins.slice(0, 3))
    console.log(basins[0].size * basins[1].size * basins[2].size)
}


runFirst().then(runSecond).then(() => console.log('finished'))
const { readByLine } = require('../util');

function printMap(map) {
    console.log(map.map(l => l.join('')).join('\n'))
}

function run(map, times, stopWhen) {
    let currentMap = map
    let flashes = 0
    let i = 0;
    for (i = 0; i < times; i++) {
        const result = runOnce(currentMap)
        currentMap = result.map
        flashes += result.flashes
        console.log(`Step ${i + 1}`)
        printMap(currentMap)
        console.log('-')
        if (stopWhen && stopWhen({ currentMap, flashes: result.flashes })) {
            break
        }
    }
    return { currentMap, flashes, step: i + 1 }
}

function runOnce(map) {
    const newMap = map.map(r => r.map(o => o + 1))
    const flashed = new Set()
    let flashedInPass = true
    while (flashedInPass) {
        flashedInPass = false
        for (let y = 0; y < newMap.length; y++) {
            const row = newMap[y]
            for (let x = 0; x < row.length; x++) {
                if (row[x] > 9 && !flashed.has(`${x},${y}`)) {
                    flashed.add(`${x},${y}`)
                    flashedInPass = true
                    // console.log('flashing', { x, y })
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            const _x = x + j
                            const _y = y + i
                            if (_x >= 0 && _x < row.length && _y >= 0 && _y < newMap.length && !(i === 0 && j === 0)) {
                                newMap[_y][_x]++
                                // console.log('incrementing', { x: _x, y: _y })
                            }
                        }
                    }
                }
            }
        }
    }
    let flashes = 0
    for (let y = 0; y < newMap.length; y++) {
        const row = newMap[y]
        for (let x = 0; x < row.length; x++) {
            if (row[x] > 9) {
                row[x] = 0
                flashes++
            }
        }
    }
    return { map: newMap, flashes }
}

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(l => l.split('').map(Number));
    console.log('Initial')
    printMap(input)
    console.log('-')
    const { map: updatedMap, flashes } = run(input, 100)
    console.log(flashes)

}

async function runSecond() {
    const input = (await readByLine(`${__dirname}/input.txt`)).map(l => l.split('').map(Number));
    console.log('Initial')
    printMap(input)
    console.log('-')
    const { map: updatedMap, flashes, step } = run(input, 100000, ({ flashes }) => flashes === 100)
    console.log(step)
}


runFirst().then(runSecond).then(() => console.log('finished'))
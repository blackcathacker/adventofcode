const { readByLine } = require('../util');

function printGrid(grid) {
    console.log(grid.map(l => l.map(c => c ? c : '.').join('')).join('\n'))
}

function mergeRow(row1, row2) {
    return row1.map((c, idx) => c || row2[idx])
}

function foldRowByX({ row, axis }) {
    console.log(row.length, axis + 1, axis + axis + 1)
    return row.slice(0, axis).map((c, idx) => c || row[axis*2 - idx])
    // return mergeRow(row.slice(0, axis), row.slice(axis + 1, axis + axis + 1).reverse())
}

function foldRowByY({ grid, row, axis, idx }) {
    const foldedIdx = (axis - idx) + axis
    if (foldedIdx < grid.length) return mergeRow(row, grid[foldedIdx])
    return row
}

function fold(grid, instruction) {
    if (instruction.axis === 'y') {
        const slice = grid.slice(0, instruction.index)
        return slice.map((row, idx) => foldRowByY({ grid, row, axis: instruction.index, idx }))
    } else {
        return grid.map((row) => foldRowByX({ row, axis: instruction.index }))
    }
}

async function runFirst() {
    const input = (await readByLine(`${__dirname}/input.txt`));
    const gridInput = input.slice(0, input.findIndex(l => l === ''))
        .map(l => l.split(',').map(Number))
        .map(l => ({ x: l[0], y: l[1] }))
    const instructions = input.slice(input.findIndex(l => l === '') + 1)
        .map(l => {
            const match = /([x-y])=([0-9]+)/.exec(l)
            return { axis: match[1], index: Number(match[2]) }
        })
    const { x: maxX, y: maxY } = gridInput.reduce((acc, coords) => {
        if (coords.x > acc.x) acc.x = coords.x
        if (coords.y > acc.y) acc.y = coords.y
        return acc
    }, { x: 0, y: 0 })
    const grid = Array.from(new Array(maxY + 1)).map(() => Array.from(new Array(maxX + 1)).map(() => false))
    gridInput.forEach(({ x, y }) => {
        grid[y][x] = '#'
    })
    const folded = fold(grid, instructions[0])
    const folded2 = fold(folded, instructions[1])
    const count = folded.reduce((count, l) => count + l.reduce((rowCount, c) => c ? rowCount + 1 : rowCount, 0), 0)
    console.log(count)
}

async function runSecond() {
    const input = (await readByLine(`${__dirname}/input.txt`));
    const gridInput = input.slice(0, input.findIndex(l => l === ''))
        .map(l => l.split(',').map(Number))
        .map(l => ({ x: l[0], y: l[1] }))
    const instructions = input.slice(input.findIndex(l => l === '') + 1)
        .map(l => {
            const match = /([x-y])=([0-9]+)/.exec(l)
            return { axis: match[1], index: Number(match[2]) }
        })
    const { x: maxX, y: maxY } = gridInput.reduce((acc, coords) => {
        if (coords.x > acc.x) acc.x = coords.x
        if (coords.y > acc.y) acc.y = coords.y
        return acc
    }, { x: 0, y: 0 })
    const grid = Array.from(new Array(maxY + 1)).map(() => Array.from(new Array(maxX + 1)).map(() => false))
    gridInput.forEach(({ x, y }) => {
        grid[y][x] = '#'
    })
    let paper = grid
    for (let i = 0; i < instructions.length; i++) {
        paper = fold(paper, instructions[i])
    }
    printGrid(paper)
}


runFirst().then(runSecond).then(() => console.log('finished'))
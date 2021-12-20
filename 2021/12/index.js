const { readByLine } = require('../util');

function isLowercase(node) {
  return node.match(/[a-z]+/)  
}

function findValidPaths(node, map, path = [], results = []) {
    // console.log(node, path)
    if (node === 'end') {
        results.push([...path, node])
    }
    else if (isLowercase(node) && path.includes(node)) {
        return undefined
    } else map[node].map(n => findValidPaths(n, map, [...path, node], results)).filter(i => i)
}

async function runFirst() {
    const map = (await readByLine(`${__dirname}/input.txt`)).reduce((acc, l) => {
        const [node1, node2] = l.split('-')
        if (!acc[node1]) acc[node1] = []
        if (!acc[node2]) acc[node2] = []
        acc[node1].push(node2)
        acc[node2].push(node1)
        return acc
    }, {});
    console.log(map)
    const paths = []
    findValidPaths('start', map, [], paths)
    console.log(JSON.stringify(paths, null, 2))
    console.log(paths.length)
}

function hasDoubleSmall(path) {
    return Object.values(path.filter(isLowercase).reduce((acc, n) => {
        if (!acc[n]) acc[n] = 1
        else acc[n]++
        return acc
    }, {})).find(c => c > 1)
}

function hasStart(path, node) {
    return node === 'start' && path.includes('start')
}

function validPath(path, node) {
    return hasDoubleSmall(path) && isLowercase(node) && path.includes(node)
}

function findValidPathsSmallTwice(node, map, path = [], results = []) {
    // console.log(node, path)
    if (node === 'end') {
        results.push([...path, node].join(','))
    }
    else if (validPath(path, node) || hasStart(path, node)) {
        return undefined
    } else map[node].map(n => findValidPathsSmallTwice(n, map, [...path, node], results)).filter(i => i)
}

async function runSecond() {
    const map = (await readByLine(`${__dirname}/input.txt`)).reduce((acc, l) => {
        const [node1, node2] = l.split('-')
        if (!acc[node1]) acc[node1] = []
        if (!acc[node2]) acc[node2] = []
        acc[node1].push(node2)
        acc[node2].push(node1)
        return acc
    }, {});
    console.log(map)
    const paths = []
    findValidPathsSmallTwice('start', map, [], paths)

    console.log(JSON.stringify(paths, null, 2))
    console.log(paths.length)
}


runFirst().then(runSecond).then(() => console.log('finished'))
const { readByLine } = require('../util');

async function runFirst() {
    const { plays, boards, numbers } = await playGames()
    console.log(boards)
    // console.log(JSON.stringify(plays, null, 2))
    const winningRoundIdx = plays.findIndex(p => p.some(boardWon))
    const winningBoardIdx = plays[winningRoundIdx].findIndex(boardWon)
    const winningBoard = boards[winningBoardIdx]
    const marks = plays[winningRoundIdx][winningBoardIdx]
    const boardScore = winningBoard.reduce((acc, r, x) => acc + r.reduce((rowSum, n, y) => marks[x][y] ? rowSum : rowSum + Number(n), 0), 0)
    const winningNumber = Number(numbers[winningRoundIdx])
    console.log({ winningBoard: boards[winningBoardIdx], marks, winningNumber, boardScore, score: boardScore * winningNumber, winningRoundIdx, winningBoardIdx })    
}

async function playGames() {
    const input = (await readByLine(`${__dirname}/input.txt`))
    const numbers = input[0].split(',')
    const boardInput = input.slice(2).map(l => l.trim())
    const { boards } = boardInput.reduce(({ boards, current }, l) => {
        if (l === '') {
            current.__id = boards.length
            return { boards: [...boards, current], current: [] }
        }
        return { boards, current: [...current, l.split(/\s+/)] }
    }, { boards: [], current: []})
    const markedBoards = boards.map(board => {
        const result = board.map(r => r.map(s => false))
        result.__id = board.__id
        return result
    })
    const plays = [markedBoards]
    for (let i = 0; i < numbers.length; i++) {
        lastBoards = plays[i]
        // console.log(lastBoards)
        plays[i + 1] = lastBoards.map((marks, idx) => playBoard(boards[idx], marks, numbers[i]))
    }
    return { numbers, boards, plays: plays.slice(1) }
}

function playBoard(board, marks, num) {
    const updated = board.map((r, x) => r.map((c, y) => c === num ? true : marks[x][y]))
    updated.__id = board.__id
    // console.log({ board, marks, updated, num })
    return updated
}

function boardWon(markedBoard) {
    const lines = [...markedBoard, ...markedBoard[0].map((val, index) => markedBoard.map(row => row[index]))]
    // console.log(lines)
    return lines.some(l => l.every(i => i))
}


async function runSecond() {
    const { plays, boards, numbers } = await playGames()
    const { lastBoard, lastRound } = plays.reduce(({ alreadyWon, lastBoard, lastRound }, play, idx) => {
        const newlyWonBoards = play.filter(board => !alreadyWon.includes(board.__id)).filter(boardWon)
        if (newlyWonBoards.length > 0) {
            return { alreadyWon: [...alreadyWon, ...newlyWonBoards.map(board => board.__id)], lastBoard: newlyWonBoards[0], lastRound: idx }
        } else return { alreadyWon, lastBoard, lastRound }
    }, { alreadyWon: [] })
    const marks = lastBoard
    const winningBoard = boards[lastBoard.__id]
    const boardScore = winningBoard.reduce((acc, r, x) => acc + r.reduce((rowSum, n, y) => marks[x][y] ? rowSum : rowSum + Number(n), 0), 0)
    const winningNumber = Number(numbers[lastRound])
    console.log({ winningBoard, marks, winningNumber, boardScore, score: boardScore * winningNumber, lastRound })    

}



runFirst().then(runSecond).then(() => console.log('finished'))
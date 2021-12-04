const fs = require('fs')
const readline = require('readline')

async function readByLine(file) {
    const fileStream = fs.createReadStream(file)
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
  
    const result = []
    for await (const line of rl) {
      result.push(line)
    }
    return result
}

module.exports = { readByLine }
const { readFile, readdir } = require('fs').promises
const { join } = require('path')
const inputDirectory = 'input'

async function load(dataIdentifier) {
  const files = await readdir(inputDirectory)
  const file = files.find(file => file.includes(`_${dataIdentifier}_`))
  if (!file) {
    throw new Error(`No input file for ${dataIdentifier}`)
  }
  return await readFile(join(inputDirectory, file), 'utf-8')
}

module.exports = {
  load
}

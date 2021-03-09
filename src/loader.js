const { readFile, readdir } = require('fs').promises
const { join } = require('path')
const inputDirectory = 'input'

async function load(dataIdentifier) {
  const files = await readdir(inputDirectory)
  const file = files.find(file => file.startsWith(dataIdentifier))
  if (!file) {
    throw new Error(`No input file starts with ${dataIdentifier}`)
  }
  return await readFile(join(inputDirectory, file))
}

module.exports = {
  load
}

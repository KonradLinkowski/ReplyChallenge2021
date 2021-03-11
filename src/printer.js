const { writeFile } = require('fs').promises
const { join } = require('path')

const outputPath = 'output'

async function print(input, antennas) {
  const data = antennas.length + '\n' + antennas.map(a => `${a.id} ${a.x} ${a.y}`).join('\n')
  await writeFile(join(outputPath, input), data)
}

module.exports = {
  print
}

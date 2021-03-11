const { writeFile } = require('fs').promises
const { join } = require('path')

const outputPath = 'output'

async function print(input, grid) {
  const data = grid.antennas.length + '\n' + grid.antennas.map(a => `${a.id} ${a.x} ${a.y}`).join('\n')
  await writeFile(join(outputPath, input), data)
}

module.exports = {
  print
}

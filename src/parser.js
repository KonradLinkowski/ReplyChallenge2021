const { Antenna, Building, Grid } = require('./models')

function parse(data) {
  const lines = data.split('\n').map(e => e.split(' ').map(e => +e))

  const [numberOfBuildings, numberOfAnthennas, reward] = lines[1]

  const buildings = []
  for (let i = 0; i < numberOfBuildings; i += 1) {
    const [x, y, latency, speed] = lines[i + 2]
    const b = new Building(x, y, latency, speed)
    buildings.push(b)
  }

  const antennas = []
  for (let i = 0; i < numberOfAnthennas; i += 1) {
    const [range, speed] = lines[i + numberOfBuildings + 2]
    const a = new Antenna(i, range, speed)
    antennas.push(a)
  }

  const [width, height] = lines[0]
  const grid = new Grid(width, height, antennas, buildings, reward)

  return grid
}

module.exports = {
  parse
}

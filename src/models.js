class Antenna {
  constructor(id, range, speed) {
    this.id = id
    this.range = range
    this.speed = speed
  }
}

class Building {
  constructor(x, y, latency, speed) {
    this.x = x
    this.y = y
    this.latency = latency
    this.speed = speed
  }
}

class Grid {
  constructor(width, height, antennas, buildings, reward) {
    this.width = width
    this.height = height
    this.antennas = antennas
    this.buildings = buildings
    this.reward = reward
  }
}

module.exports = {
  Antenna,
  Building,
  Grid
}

class Antenna {
  constructor(id, range, speed) {
    this.id = id
    this.range = range
    this.speed = speed
    this.x = null
    this.y = null
  }

  clone() {
    return new Antenna(this.id, this.range, this.speed)
  }
}

class Building {
  constructor(x, y, latency, speed) {
    this.x = x
    this.y = y
    this.latency = latency
    this.speed = speed
  }

  clone() {
    return new Building(this.x, this.y, this.latency, this.speed)
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

  clone() {
    const newAntennas = this.antennas.map(a => a.clone())
    const newBuildings = this.buildings.map(b => b.clone())
    return new Grid(this.width, this.height, newAntennas, newBuildings, this.reward)
  }
}

module.exports = {
  Antenna,
  Building,
  Grid
}

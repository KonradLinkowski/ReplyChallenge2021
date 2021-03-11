class Computer {
  constructor(grid) {
    this.grid = grid
  }

  compute() {
    
  }

  seed() {
    const ants = this.grid.antennas.map(a => a.clone())
    ants.forEach(a => {
      a.x = Math.floor(Math.random() * this.grid.width)
      a.y = Math.floor(Math.random() * this.grid.height)
    })
    return ants
  }

  mutate(antennas) {
    return antennas.map(antenna => {
      const a = antenna.clone()
      let x = null
      let y = null
      do {
        y = antenna.y + Math.floor(Math.random() * this.grid.height)
        x = antenna.x + Math.floor(Math.random() * this.grid.width)
      } while(!this.inConstrains(x, y))
      a.x = x
      a.y = y
      return a
    })
  }

  crossover(mother, father) {
    const m0 = mother.filter((_, i) => i % 2 == 0)
    const m1 = mother.filter((_, i) => i % 2 == 1)
    const f0 = father.filter((_, i) => i % 2 == 0)
    const f1 = father.filter((_, i) => i % 2 == 1)

    return [
      [m0.map(a => a.clone()), m1.map(a => a.clone())],
      [f0.map(a => a.clone()), f1.map(a => a.clone())]
    ]
  }

  inConstrains(x, y) {
    return x >= 0 && x < this.grid.width && y >= 0 && y <= this.grid.height
  }
  
  calculateScore() {
    let sum = 0
    let allConnected = true
    for (const b of this.grid.buildings) {
      let bestScore = Number.NEGATIVE_INFINITY
      for (const a of this.grid.antennas) {
        const dist = calculateDistance(a.x, a.y, b.x, b.y)
        if (dist > a.range) {
          allConnected = false
          return
        }
        const score = b.speed * a.speed - b.latency * dist
        if (score > bestScore) {
          bestScore = score
        }
      }
      sum += bestScore
      if (allConnected) {
        sum += this.grid.reward
      }
    }
    return sum
  }

  calculateDistance(x1, x2, y1, y2) {
    return Math.abs(x2 - x1) + (y2 - y1)
  }
}

module.exports = {
  Computer
}

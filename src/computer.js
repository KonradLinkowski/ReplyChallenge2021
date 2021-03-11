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
}

module.exports = {
  Computer
}

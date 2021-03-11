const GeneticAlgorithmConstructor = require('geneticalgorithm')

class Computer {
  constructor(grid) {
    this.grid = grid
    
    this.genetic = GeneticAlgorithmConstructor({
      mutationFunction: this.mutate.bind(this),
      crossoverFunction: this.crossover.bind(this),
      fitnessFunction: this.fitness.bind(this),
      population: [ this.seed() ],
    })
  }

  compute(populationSize) {
    this.genetic.evolve({
      populationSize
    })
    return {
      best: this.genetic.best(),
      score: this.genetic.bestScore()
    }
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
    return antennas.map(a => {
      let x = null
      let y = null
      do {
        y = a.y + Math.floor(Math.random() * this.grid.height)
        x = a.x + Math.floor(Math.random() * this.grid.width)
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
      [...m0, ...m1],
      [...f0, ...f1]
    ]
  }

  inConstrains(x, y) {
    return x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height
  }

  fitness(antennas) {
    const score = this.calculateScore({
      antennas,
      buildings: this.grid.buildings,
      reward: this.grid.reward
    })
    return score
  }
  
  calculateScore({ antennas, buildings, reward }) {
    let sum = 0
    let allConnected = true
    for (const b of buildings) {
      let bestScore = 0
      for (const a of antennas) {
        const dist = this.calculateDistance(a.x, a.y, b.x, b.y)
        if (dist > a.range) {
          allConnected = false
          continue
        }
        const score = b.speed * a.speed - b.latency * dist
        if (score > bestScore) {
          bestScore = score
        }
      }
      sum += bestScore
     
    }
    if (allConnected) {
      sum += reward
    }
    return sum || 0
  }

  calculateDistance(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1)
  }
}

module.exports = {
  Computer
}

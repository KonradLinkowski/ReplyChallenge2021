function compute(grid) {
  const clone = grid.clone()
  clone.antennas.forEach(a => {
    a.x = Math.random() * grid.width | 0
    a.y = Math.random() * grid.height | 0
  })

  return clone
}

function calculateScore(grid) {
  let sum = 0
  let allConnected = true
  for (const b of grid.buildings) {
    let bestScore = Number.NEGATIVE_INFINITY
    for (const a of grid.antennas) {
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
      sum += grid.reward
    }
  }
  return sum
}

function calculateDistance(x1, x2, y1, y2) {
  return Math.abs(x2 - x1) + (y2 - y1)
}

module.exports = {
  compute,
  calculateScore
}

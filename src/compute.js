function compute(grid) {
  const clone = grid.clone()
  clone.antennas.forEach(a => {
    a.x = Math.random() * grid.width | 0
    a.y = Math.random() * grid.height | 0
  })

  return clone
}

module.exports = {
  compute
}

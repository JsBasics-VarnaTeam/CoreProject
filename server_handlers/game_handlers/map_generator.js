module.exports = (io) => {
  io.map = []
  let step = 100
  let edgeOffset = 5
  for (let row = 100; row < 600; row += 100) {
    for (let col = 100; col < 1200; col += 100) {
      // Chance is 1/5 for direction
      let chance = Math.floor(Math.random() * 5) + 1
      if (chance === 1) {
        // Vertical down
        let line = {x1: col, y1: row, x2: col, y2: row + step + edgeOffset}
        io.map.push(line)
      } else if (chance === 2) {
        // Vertical up
        let line = {x1: col, y1: row, x2: col, y2: row - step}
        io.map.push(line)
      } else if (chance === 3) {
        // Horizontal right
        let line = {x1: col, y1: row, x2: col + step + edgeOffset, y2: row}
        io.map.push(line)
      } else if (chance === 4) {
        let line = { x1: col, y1: row, x2: col - step, y2: row }
        io.map.push(line)
      }
    }
  }
}

client.on('new-map', (data) => {
  console.log(data)
  let pos
  map = data.map
  for (pos of map) {
    let line = new fabric.Line([pos.x1, pos.y1, pos.x2, pos.y2], {
      stroke: 'black',
      strokeWidth: 5
    })
    canvas.add(line)
  }
})

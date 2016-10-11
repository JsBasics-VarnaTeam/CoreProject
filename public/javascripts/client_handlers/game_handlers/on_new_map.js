client.on('new-map', (data) => {
  console.log(data)
  let pos
  for (pos of data.map) {
    let line = new fabric.Line([pos.x1, pos.y1, pos.x2, pos.y2], {
      stroke: 'black',
      strokeWidth: 5
    })

    pos.gameObj = line
    map.push(pos.gameObj)
    canvas.add(pos.gameObj)
  }
})

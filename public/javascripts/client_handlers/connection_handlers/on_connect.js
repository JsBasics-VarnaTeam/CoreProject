/**
 * Created by Krasimir on 10/2/2016.
 */
let client = io({transports: ['websocket'], upgrade: false})
let players = {}
// holds client id received from server
let clientId
// keeps track of latency between server and client
let lat = []
let avglat
let serverTimeOffset = 0
let map = []

function avg(arr) {
  return arr.reduce((a, b) => { return a + b}) / arr.length
}

// Handshake accepted between server and client
client.on('connect', () => {
    // Callback on successful connection
  client.on('my-id', (data) => {
    clientId = data.id
  })

    // send the server username for """"authentication"""" testing
  client.emit('username', {username: username})

  client.on('disconnect', () => {
     window.history.back()
  })
})

// keeps track of client latency every 500 ms
setInterval(() => {
  client.emit('latency', new Date().getTime(), (startTime) => {
        // averages the latency
    lat.push((new Date().getTime() - startTime))

    if(lat.length > 50) {
      lat.shift()
    }

    avglat = avg(lat)
  })
}, 1000)

// calculates the difference between server clock and client clock
client.on('time', (data) => {
  if (avglat) {
    serverTimeOffset = new Date().getTime() - (data.time + avglat / 2)
  } else {
    serverTimeOffset = new Date().getTime() - data.time
  }
  // console.log('time offset: ' + serverTimeOffset)
})

window.onbeforeunload = function (e) {
  client.disconnect()
}

setInterval(() => {
  console.log('lat: ' + avglat)
  console.log('serverTimeOffset: ' + serverTimeOffset)
}, 5000)

// setInterval(() => {
// }, 5000)


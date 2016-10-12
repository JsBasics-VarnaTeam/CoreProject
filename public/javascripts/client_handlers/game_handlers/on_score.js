client.on('score', (data) => {
    document.getElementById(data.id).innerText = `${data.player.username}: ${data.player.score}`
})
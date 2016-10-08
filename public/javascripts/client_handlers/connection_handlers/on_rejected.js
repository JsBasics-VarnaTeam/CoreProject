/**
 * Created by Krasimir on 10/6/2016.
 */
client.on('rejected', (data) => {
  console.log(data)
  let paragraph = document.createElement('p')
  paragraph.appendChild(document.createTextNode(data))
  document.body.appendChild(paragraph)
})

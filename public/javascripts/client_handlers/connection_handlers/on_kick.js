/**
 * Created by Krasimir on 10/6/2016.
 */
// client will be kicked by server after 6 sec
// if he does not have username
// (that's only possible if the connection was interrupted)
client.on('kick', (data) => {
  let paragraph = document.createElement('p')
  paragraph.appendChild(document.createTextNode(data))
  document.body.appendChild(paragraph)
})

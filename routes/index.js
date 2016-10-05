let express = require('express')
let router = express.Router()

/* GET home page. */
//

router.get('/', function(req, res, next) {
  res.render('index', { title: 'SocketTest' })
})

// router.post('/', (req, res, next) => {
//     let username = req.body.username
//     console.log(username)
//     res.send({accepted: true, username: username})
// })

router.get('/connect', (req, res, next) => {
    let username = req.query.username
    res.render('game', {title: 'Game', username: username})
})

module.exports = router

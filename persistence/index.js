var express = require('express')
var bodyParser = require('body-parser')
var transactor = require('./db/transactor')
var dataStore = require('./db/dataStore')

var allowCrossDomain = function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
}

var app = express()
app.use(bodyParser.json())
app.use(allowCrossDomain)

app.post('/transact', function (req, res) {
  transactor.add(req.body.payload)
  res.send('transaction added')
})

app.get('/snapshot', function(req, res) {
  dataStore.fetchSnapshot(req.query.id, function(modified, payload) {
    if (modified) {
      res.send( payload )
    } else {
      res.status(304).end()
    }
  })
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

})
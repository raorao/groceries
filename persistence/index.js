var express = require('express')
var bodyParser = require('body-parser')
var transactor = require('./transactor')
var dataStore = require('./dataStore')

var app = express()
app.use(bodyParser.text())

app.post('/transact', function (req, res) {
  transactor.add('payload')
  res.send('transaction added')
})

app.get('/snapshot', function(req, res) {
  dataStore.all()
  res.send('snapshot printed')
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

})
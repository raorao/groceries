var express = require('express')
var app = express()

app.post('/transact', function (req, res) {
  res.send('transacting')
})

app.get('/snapshot', function(req, res) {
  res.send("here's a snapshot of your data.")
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

})
var db = require('./client')
var client = db.client
var print = db.print

exports.add = function(payload) {
  var key = new Date().getTime();
  client.hset('transactions', key, payload, print)
  client.rpush('transactionKeys', key, print)
}
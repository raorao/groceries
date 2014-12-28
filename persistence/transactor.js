var db = require('./db')
var client = db.client
var print = db.print

exports.add = function(payload) {
  var key = new Date().getTime();
  client.set(key, payload, print)
}
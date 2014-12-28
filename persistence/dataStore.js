var db = require('./db')
var client = db.client

exports.all = function() {
  client.keys('*',function(err, reply) {
    console.log(reply)
  })
}

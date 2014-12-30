var db = require('./db')
var client = db.client

exports.status = function() {
  client.keys('*',function(err, reply) {
    console.log('all keys', reply)
  })

  client.hgetall('transactions', function(err,reply) {
    console.log('all transactions', reply)
  })

  client.lrange('transactionKeys', -1, -1, function(err, reply) {
    console.log('most recent transactionKey', reply)
  })
}

var DEFAULT_CONTENTS = { highestId: 0, items:[] }

exports.generateSnapshot = function(transactions, keyList) {
  return DEFAULT_CONTENTS
}

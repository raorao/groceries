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
  var contents = keyList.reduce(function(contents,id) {

    var transaction = transactions[id];
    console.log(transactions)
    // create transaction
    var item = transaction.item
    contents.items.push(item);
    contents.highestId = Math.max(contents.highestId,item.id);
    return contents

  }, DEFAULT_CONTENTS)

  return contents
}

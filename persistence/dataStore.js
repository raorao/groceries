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

var defaultContents = function() {
  return { highestId: 0, items:[] }
}

exports.generateSnapshot = function(transactions, keyList) {
  var contents = keyList.reduce(function(contents,id) {

    var transaction = transactions[id];
    switch (transaction.type) {
      case 'create':
        var item = transaction.item
        contents.items.push(item);
        contents.highestId = Math.max(contents.highestId,item.id);
        return contents
        break;
      case 'update':
        var attributes = transaction.attributes
        var items = contents.items.map(function(item) {
          if (item.id === transaction.id) {
            for (var key in attributes ) { item[key] = attributes[key]; }
          }
          return item
        })
        contents.items = items
        return contents
        break;
    }
  }, defaultContents() )

  return contents
}

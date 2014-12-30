var db = require('./db')
var client = db.client

var defaultContents = function() {
  return { highestId: 0, items:[] }
}

var createItem = function(transaction, contents) {
  var item = transaction.item
  var highestId = contents.highestId
  var currentIds  = contents.items.map(function(item) { return item.id })

  if (currentIds.indexOf(item.id) === -1) {
    contents.items.push(item);
    contents.highestId = Math.max(highestId,item.id);
  } else {
    item.id = ++highestId;
    contents.items.push(item);
    contents.highestId = item.id;
  }

  return contents
}

var updateItem = function(transaction, contents) {
  var attributes = transaction.attributes
  var items = contents.items.map(function(item) {
    if (item.id === transaction.id) {
      for (var key in attributes ) { item[key] = attributes[key]; }
    }
    return item
  })
  contents.items = items
  return contents
}

var deleteItem = function(transaction, contents) {
  var items = contents.items.filter(function(item) {
    return item.id !== transaction.id
  })
  contents.items = items
  return contents
}

var generateSnapshot = function(transactions, keyList) {
  var contents = keyList.reduceRight(function(contents,id) {
    var transaction = JSON.parse(transactions[id]);
    switch (transaction.type) {
      case 'create':
        return createItem(transaction,contents);
        break;
      case 'update':
        return updateItem(transaction,contents);
        break;
      case 'delete':
        return deleteItem(transaction,contents);
        break;
      default:
        throw new Error('unrecognized transaction type ' + transaction.type )


    }
  }, defaultContents() )

  return contents
}

exports.generateSnapshot = generateSnapshot;

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


exports.fetchSnapshot = function(callback) {
  client.lrange('transactionKeys', 0, -1, function(err, keyList) {
    client.hgetall('transactions', function(err,transactions) {
      callback( generateSnapshot(transactions,keyList) )
    })
  })
}

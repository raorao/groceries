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
  var contents = keyList.reduce(function(contents,id) {
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

var calculateLastTransactionId = function(keys) {
  var key = keys.slice(-1)[0]
  return key ? key : '0'
}

var fetchTransactionKeys = function(callback) {
  client.lrange('transactionKeys', 0, -1, function(err,payload) { callback(payload) })
}

var fetchTransactions = function(callback) {
  client.hgetall('transactions', function(err,payload) { callback(payload) })
}

var fetchSnapshotFromCache = function(id, callback) {
  client.hget('snapshotCache', id, function(err,payload) { callback(payload) })
}

var cacheSnapshot = function(id, payload) {
  client.hset('snapshotCache', id, payload)
}

var returnNewSnapshot = function(id,keyList,callback) {
  fetchSnapshotFromCache(id, function(snapshot) {
    if (snapshot) {
      callback(true, snapshot)
    } else {
      fetchTransactions(function(transactions) {
        var contents = generateSnapshot(transactions,keyList)
        var payload = JSON.stringify({contents: contents, lastTransactionId: id})
        cacheSnapshot(id, payload)
        callback(true, payload)
      })
    }
  })
}

exports.generateSnapshot = generateSnapshot;

exports.fetchSnapshot = function(clientId, callback) {
  fetchTransactionKeys(function(keyList) {
    var lastTransactionId = calculateLastTransactionId(keyList)
    if(lastTransactionId === clientId) {
      callback(false)
    } else {
      returnNewSnapshot(lastTransactionId,keyList,callback)
    }

  })
}

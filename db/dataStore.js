var client = require('./client')
var generateSnapshot = require('./snapshotGenerator').generate

fetchTransactionKeys = client.fetchTransactionKeys;
fetchTransactions = client.fetchTransactions;
fetchSnapshotFromCache = client.fetchSnapshotFromCache;
cacheSnapshot = client.cacheSnapshot;

var calculateLastTransactionId = function(keys) {
  var key = keys.slice(-1)[0]
  return key ? key : '0'
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

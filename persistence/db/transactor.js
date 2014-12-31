var db = require('./client')
var client = db.client

var addTransaction = function(key, payload) {
  client.hset('transactions', key, payload, db.print)
}

var addTransactionKey = function(payload) {
  client.rpush('transactionKeys', payload, db.print)
}



exports.add = function(transaction) {
  var key = new Date().getTime();
  addTransaction(key,transaction);
  addTransactionKey(key);
}
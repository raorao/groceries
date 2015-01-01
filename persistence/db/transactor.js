var client = require('./client')

addTransaction = client.addTransaction
addTransactionKey = client.addTransactionKey

exports.add = function(transaction) {
  var key = new Date().getTime();
  addTransaction(key,transaction);
  addTransactionKey(key);
}
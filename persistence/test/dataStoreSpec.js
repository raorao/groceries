var assert = require('assert')
var dataStore = require('../dataStore')

describe('generateSnapshot', function() {
  it('should return the default value if there are no transactions', function() {
    var transactionKeys = []
    var transactions = []
    var snapshot = dataStore.generateSnapshot(transactions, transactionKeys)
    assert.deepEqual(snapshot,{ highestId: 0, items: [] })
  })
})
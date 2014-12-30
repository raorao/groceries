var assert = require('assert')
var dataStore = require('../dataStore')

var ITEM = { id: 1, completed: false, value: 'a gallon of milk'}
var CREATE_TRANSACTION = {type: 'create', item: ITEM }
var UPDATE_TRANSACTION = {type: 'update', id: 1, attributes: { value: 'new value' } }

describe('generateSnapshot', function() {
  var transactionKeys, transactions, expected;

  var assertSnapshotEqual = function(expected) {
    assert.deepEqual(expected, dataStore.generateSnapshot(transactions, transactionKeys))
  }

  it('should return the default value if there are no transactions', function() {
    transactionKeys = []
    transactions = {}
    assertSnapshotEqual({ highestId: 0, items: [] });
  })

  it('should handle a transaction of type create', function() {
    transactionKeys = ['1111']
    transactions = { '1111': CREATE_TRANSACTION }
    assertSnapshotEqual({ highestId: 1, items: [CREATE_TRANSACTION.item]})
  })

  it('should handle a transaction of type update', function() {
    transactionKeys = ['1111', '2222']
    transactions = { '1111': CREATE_TRANSACTION, '2222': UPDATE_TRANSACTION }
    updatedItem = { id: ITEM.id, completed: ITEM.completed, value: UPDATE_TRANSACTION.attributes.value }
    assertSnapshotEqual({ highestId: 1, items: [updatedItem]})
  })
})


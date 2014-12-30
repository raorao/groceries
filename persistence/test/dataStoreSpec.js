var assert = require('assert')
var dataStore = require('../dataStore')

var ITEM = { id: 1, completed: false, value: 'a gallon of milk'}
var CREATE_TRANSACTION = {type: 'create', item: ITEM }
var UPDATE_TRANSACTION = {type: 'update', id: 1, attributes: { value: 'new value' } }
var DELETE_TRANSACTION = {type: 'delete', id: 1}

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
    transactionKeys = ['2222', '1111']
    transactions = { '1111': CREATE_TRANSACTION, '2222': UPDATE_TRANSACTION }
    updatedItem = { id: ITEM.id, completed: ITEM.completed, value: UPDATE_TRANSACTION.attributes.value }
    assertSnapshotEqual({ highestId: 1, items: [updatedItem]})
  })

  it('should handle a transaction of type delete', function() {
    transactionKeys = ['2222', '1111']
    transactions = { '1111': CREATE_TRANSACTION, '2222': DELETE_TRANSACTION }
    assertSnapshotEqual({ highestId: 1, items: []})
  })

  it('should handle two conflicting creation transactions', function() {
    transactionKeys = ['2222', '1111']
    transactions = {
        '1111': {type: 'create', item: { id: 1, completed: false, value: 'a gallon of milk'} },
        '2222': {type: 'create', item: { id: 1, completed: false, value: 'a stick of butter'} }
      }
    assertSnapshotEqual({ highestId: 2,
                          items: [
                            { id: 1, completed: false, value: 'a gallon of milk'},
                            { id: 2, completed: false, value: 'a stick of butter'}
                          ]
                        })
  })

  it('should handle two conflicting deletion transactions', function() {
    transactionKeys = ['3333', '2222', '1111']
    transactions = {
        '1111': {type: 'create', item: { id: 1, completed: false, value: 'a gallon of milk'} },
        '2222': {type: 'delete', id: 1},
        '3333': {type: 'delete', id: 1}
      }
    assertSnapshotEqual({ highestId: 1, items: [] })
  })

  it('should handle a series of transactions (integration-y)', function() {
    transactionKeys = ['5','4','3','2','1']
    transactions = {
      '1': { type: 'create', item: { id: 1, completed: false, value: 'a gallon of milk'} },
      '2': { type: 'update', id: 1, attributes: { completed: true } },
      '3': { type: 'create', item: { id: 2, completed: false, value: 'a loaf of bread'} },
      '4': { type: 'update', id: 1, attributes: { value: 'a stick of butter' } },
      '5': { type: 'delete', id: 2 }
    }
    assertSnapshotEqual({ highestId: 2, items: [{ id: 1, completed: true, value: 'a stick of butter'}] })
  })
})


Transactor = (function(request) {
  var makeRequest = function(payload) {
    request.post('/transact')
      .send({ payload: JSON.stringify(payload) })
      .end()
  }
  return {
    update: function(id, attributes) {
      var payload = { type: 'update', id: id, attributes: attributes }
      makeRequest(payload)
    },
    delete: function(id) {
      var payload = { type: 'delete', id: id }
      makeRequest(payload)
    },
    create: function(item) {
      // item has id(int), completed(boolean), and value(text) attributes
      var payload = { type: 'create', item: item }
      makeRequest(payload)
    }
  }
})(superagent);
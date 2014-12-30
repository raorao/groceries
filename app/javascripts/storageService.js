// requires appAction

StorageService = (function(request) {

  var lastTransactionId = '0'

  var handleResponse = function(error,res) {
    if (res.status === 200) {
      var payload = JSON.parse(res.text);
      lastTransactionId = payload.lastTransactionId;
      AppAction.load(payload.contents);
    }
  }

  var poll = function() {
    request.get('http://0.0.0.0:3000/snapshot')
      .query({ id: lastTransactionId })
      .end(handleResponse)
  };

  return {
    connect: function() {
      setInterval(poll,1000);
    },
  }
})(superagent);
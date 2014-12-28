// requires appAction

StorageService = (function(request) {

  var lastTransactionId = 0;

  var poll = function() {
    request.get('http://0.0.0.0:3000/snapshot')
      .query({id: lastTransactionId})
      .end(function(error,res) {
        console.log('server responds with', res)
      })
  };

  return {
    connect: function() {
      console.log('connected to storage service');
      setInterval(poll,1000);
    },
  }
})(superagent);
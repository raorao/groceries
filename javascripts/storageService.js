// requires appAction

StorageService = (function() {

  var loaded = false

  var poll = function() {
    // request contains lastTransaction(int) value
    console.log('making request to storage service to check for updates');
    // this will only fire if request returns a 200 status code
    // if(!loaded) { AppAction.load('highestId, lastTransaction, items') };
    loaded = true
  };

  return {
    connect: function() {
      console.log('connected to storage service');
      setInterval(poll,1000);
    },
  }
})();
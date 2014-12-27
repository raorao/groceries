// requires appAction

StorageService = (function() {

  var lastTransaction = 0;

  var poll = function() {
    // request contains lastTransaction(int) value
    console.log('making request to storage service to check for updates');
    // this will only fire if request returns a 200 status code
    if(lastTransaction !== 1) {
      lastTransaction = 1;
      AppAction.load('highestId, items')
    };

  };

  return {
    connect: function() {
      console.log('connected to storage service');
      setInterval(poll,1000);
    },
  }
})();
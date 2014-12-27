// requires Dispatcher


AppAction = {
  CREATE: 'CREATE',
  create: function(arg) {
    Dispatcher.dispatch( { actionType: AppAction.CREATE, arg: arg } )
  }
};

Dispatcher.register(function(payload) {
  switch (payload.actionType) {
    case AppAction.CREATE:
      alert(payload.arg);
    default:
      throw new Error("Unknown AppAction actionType: " + payload.actionType)
  }

});
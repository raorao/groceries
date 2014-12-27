// requires Dispatcher, Store


AppAction = {
  CREATE: 'CREATE',
  create: function(itemValue) {
    Dispatcher.dispatch( { actionType: AppAction.CREATE, itemValue: itemValue } )
  }
};

Dispatcher.register(function(payload) {
  switch (payload.actionType) {
    case AppAction.CREATE:
      Store.create(payload.itemValue);
      break;
    default:
      throw new Error("Unknown AppAction actionType: " + payload.actionType);
  }

});
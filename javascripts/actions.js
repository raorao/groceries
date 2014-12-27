// requires Dispatcher, Store


AppAction = {
  CREATE: 'CREATE',
  create: function(itemValue) {
    Dispatcher.dispatch( { actionType: AppAction.CREATE, itemValue: itemValue } )
  },
  UPDATE: 'UPDATE',
  update: function(id, attributes) {
    Dispatcher.dispatch( { actionType: AppAction.UPDATE, id: id, attributes: attributes } )

  }
};

Dispatcher.register(function(payload) {
  switch (payload.actionType) {
    case AppAction.CREATE:
      Store.create(payload.itemValue);
      break;
    case AppAction.UPDATE:
      Store.update(payload.id, payload.attributes);
      break;
    default:
      throw new Error("Unknown AppAction actionType: " + payload.actionType);
  }

});
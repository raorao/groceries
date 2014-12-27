// requires Dispatcher, Store


AppAction = {
  CREATE: 'CREATE',
  create: function(itemValue) {
    Dispatcher.dispatch( { actionType: AppAction.CREATE, itemValue: itemValue } )
  },

  UPDATE: 'UPDATE',
  update: function(id, attributes) {
    Dispatcher.dispatch( { actionType: AppAction.UPDATE, id: id, attributes: attributes } );
  },

  DELETE: 'DELETE',
  delete: function(id) {
    Dispatcher.dispatch( { actionType: AppAction.DELETE, id: id } );
  },

  CONNECT: 'CONNECT',
  connect: function() {
    Dispatcher.dispatch( { actionType: AppAction.CONNECT } );
  },

  LOAD: 'LOAD',
  load: function(contents) {
    Dispatcher.dispatch( { actionType: AppAction.LOAD, contents: contents } );
  }
};

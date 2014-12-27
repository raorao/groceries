// requires event emitter

Store = (function() {

  var eventEmitter = new MicroEvent()

  var CHANGE_EVENT = 'CHANGE_EVENT'

  var contents = Immutable({
    items: []
  });

  var getItems = function() {
    return contents.items;
  };

  var setItems = function(items) {
    contents = contents.merge({items: items});
    eventEmitter.trigger(CHANGE_EVENT);
  };

  return {
    getItems: function() { return getItems().asMutable() },
    onChangeEvent: function(callback) {
      eventEmitter.bind(CHANGE_EVENT, callback)
    },
    create: function(itemValue) {
      var items = getItems();
      setItems( items.concat([itemValue]) );
    }
  }
})();



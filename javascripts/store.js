// requires event emitter

Store = (function() {

  var eventEmitter = new MicroEvent()

  var CHANGE_EVENT = 'CHANGE_EVENT'

  var DEFAULT_ITEM = Immutable({
    value: 'some value',
    checked: false
  });

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
      var item = DEFAULT_ITEM.merge({value: itemValue})
      setItems( items.concat([item]) );
    }
  }
})();



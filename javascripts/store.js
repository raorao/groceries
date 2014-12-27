// requires event emitter

Store = (function() {

  var eventEmitter = new MicroEvent()

  var CHANGE_EVENT = 'CHANGE_EVENT'

  var DEFAULT_ITEM = Immutable({
    id: 0,
    value: 'some value',
    checked: false
  });

  var contents = Immutable({
    highestId: 0,
    items: []
  });

  var getItems = function() {
    return contents.items;
  };

  var set = function(attributes) {
    contents = contents.merge(attributes);
    eventEmitter.trigger(CHANGE_EVENT);
  };

  return {
    getItems: function() { return getItems().asMutable() },
    onChangeEvent: function(callback) {
      eventEmitter.bind(CHANGE_EVENT, callback)
    },
    create: function(itemValue) {
      var items = getItems();
      var highestId = contents.highestId;
      var item = DEFAULT_ITEM.merge({value: itemValue, id: ++highestId})

      set({items: items.concat([item]), highestId: highestId});
    }
  }
})();



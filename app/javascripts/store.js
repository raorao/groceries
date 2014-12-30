// requires event emitter, transactor

Store = (function() {

  var eventEmitter = new MicroEvent()

  var CHANGE_EVENT = 'CHANGE_EVENT'

  var DEFAULT_ITEM = Immutable({
    id: 0,
    value: 'some value',
    completed: false
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
    getItems: function() { return getItems().asMutable({deep: true}) },

    onChangeEvent: function(callback) {
      eventEmitter.bind(CHANGE_EVENT, callback)
    },

    create: function(itemValue) {
      var items = getItems();
      var highestId = contents.highestId;
      var item = DEFAULT_ITEM.merge({value: itemValue, id: ++highestId})

      Transactor.create(item)

      set({items: items.concat([item]), highestId: highestId});
    },

    delete: function(id) {
      var items = getItems();

      items = items.filter(function(item) {
        if(item.id !== id) {
          return true
        } else {
          Transactor.delete(id);
          return false
        }
      })

      set({items: items})
    },

    update: function(id, newAttributes) {
      var items = getItems()
      items = items.map(function(item) {
        if(item.id === id) {
          var newItem = item.merge(newAttributes)
          if (item !== newItem) { Transactor.update(id, newAttributes) };
          return newItem
        } else {
          return item
        }
      })

      set({items: items})
    },

    load: function(newContents) {
      set(newContents);
    },
  }
})();



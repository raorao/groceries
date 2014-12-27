Store = (function() {

  var contents = Immutable({
    items: []
  });

  var getItems = function() {
    return contents.items;
  };

  var setItems = function(items) {
    contents = contents.merge({items: items});
  };

  return {
    create: function(itemValue) {
      var items = getItems();
      setItems( items.concat([itemValue]) );
    }
  }
})();



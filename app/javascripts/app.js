Dispatcher.register(function(payload) {
  switch (payload.actionType) {
    case AppAction.CREATE:
      Store.create(payload.itemValue);
      break;
    case AppAction.UPDATE:
      Store.update(payload.id, payload.attributes);
      break;
    case AppAction.DELETE:
      Store.delete(payload.id);
      break;
    case AppAction.CONNECT:
      StorageService.connect();
      break;
    case AppAction.LOAD:
      Store.load(payload.contents)
      break;
    default:
      throw new Error("Unknown AppAction actionType: " + payload.actionType);
  }
});

window.onload = function() {
  var container = document.getElementById('container');
  AppAction.connect()
  React.render(Page(), container);
}
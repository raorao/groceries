Dispatcher =  (function() {
  var handlers = [];
  var isDispatching = false;
  var pendingPayload = null;

  return {

    register: function(callback) {
      handlers.push({
        isPending: false,
        isHandled: false,
        callback: callback
      });
    },

    dispatch: function(payload) {
      if (isDispatching) {
        throw new Error('cannot dispatch in the middle of a dispatch!')
      };

      handlers.forEach(function(handler) {
        handler.isPending = false;
        handler.isHandled = false;
      });

      pendingPayload = payload;
      isDispatching = true;

      try {
        handlers.forEach(function(handler) {
          if (!handler.isPending) {
            handler.isPending = true;
            handler.callback(payload);
            return handler.isHandled = true;
          }
        });
      } finally {
        endingPayload = null;
        isDispatching = false;
      }
    }

  }
})();
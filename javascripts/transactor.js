Transactor = (function() {
  return {
    update: function(id, attributes) {
      console.log('transactor registers update', arguments)
    },
    delete: function(id) {
      console.log('transactor registers deletion', arguments)
    },
    create: function(item) {
      console.log('transactor registers creation', arguments)
    }
  }
})();
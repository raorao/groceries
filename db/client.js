module.exports = (function() {
  var redis = require("redis")


  var heroku_url = process.env.REDISTOGO_URL

  if(heroku_url) {
    var rtg   = require("url").parse(heroku_url);
    var client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
  } else {
    client = redis.createClient(6379, '127.0.0.1', {})
  }

  client.on('ready', function() {
    console.log('redis is ready')
  })

  client.on('connected', function() {
    console.log('connected', arguments)
  })

  client.on('error', function() {
    console.log('error', arguments)
  })

  return {
    fetchTransactionKeys: function(callback) {
      client.lrange('transactionKeys', 0, -1, function(err,payload) { callback(payload) })
    },

    fetchTransactions: function(callback) {
      client.hgetall('transactions', function(err,payload) { callback(payload) })
    },

    fetchSnapshotFromCache: function(id, callback) {
      client.hget('snapshotCache', id, function(err,payload) { callback(payload) })
    },

    cacheSnapshot: function(id, payload) {
      client.hset('snapshotCache', id, payload)
    },

    addTransaction: function(key, payload) {
      client.hset('transactions', key, payload, redis.print)
    },

    addTransactionKey: function(payload) {
      client.rpush('transactionKeys', payload, redis.print)
    }
  }
})()

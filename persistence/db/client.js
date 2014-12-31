var redis = require("redis")
client = redis.createClient(6379, '127.0.0.1', {})

client.on('ready', function() {
  console.log('redis is ready')
})

client.on('connected', function() {
  console.log('connected', arguments)
})

client.on('error', function() {
  console.log('error', arguments)
})

exports.client = client
exports.print = redis.print
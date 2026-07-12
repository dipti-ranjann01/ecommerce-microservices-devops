const redis = require("redis");
const Config = require("../config/index");
const url = `redis://${Config.REDIS_HOST}:${Config.REDIS_PORT}`;
const client = redis.createClient({
  url: url,
});

client.connect();

module.exports = client;
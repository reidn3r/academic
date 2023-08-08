const redis = require('redis');

const client = redis.createClient();
client.on('error', err => console.log(err));
client.on('connect', err => console.log(`Redis: connected`));

module.exports = client;
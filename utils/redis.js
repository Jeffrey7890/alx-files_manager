const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Handle error event
    this.client.on('error', (error) => {
      console.error('Redis error:', error);
    });
  }

  // Checks if the client is connected
  isAlive() {
    return this.client.ready;
  }

  // Gets a value from Redis
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  // Sets a value in Redis with expiration time (in seconds)
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  // Deletes a key from Redis
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;

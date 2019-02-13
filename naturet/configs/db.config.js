const mongoose = require('mongoose');

const DB_NAME = 'naturet'
const PASSWORD = process.env.MB_PASSWORD
const MONGODB_URI = `mongodb://naturapp:${PASSWORD}@naturapp-shard-00-00-uhjip.mongodb.net:27017,naturapp-shard-00-01-uhjip.mongodb.net:27017,naturapp-shard-00-02-uhjip.mongodb.net:27017/test?ssl=true&replicaSet=naturapp-shard-0&authSource=admin&retryWrites=true`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.info(`Connected to the database: ${MONGODB_URI}`))
  .catch(error => console.error('Database connection error:', error));
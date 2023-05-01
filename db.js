const { MongoClient } = require('mongodb')
require('dotenv').config()


let dbConnection

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.MONGO_URI_LOCAL)
      .then(client => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}

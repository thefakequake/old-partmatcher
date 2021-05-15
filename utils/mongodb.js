import mongo, { MongoClient } from "mongodb"
import Grid from "gridfs-stream"

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  )
}

let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase(dbIndex = 0) {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      const dbName = MONGODB_DB.split(",")[dbIndex]
      const db = client.db(dbName)
      var returnObj = {
        client,
        db: db
      }
      if (dbName == "Files") {
        returnObj.gfs = Grid(db, mongo)
      }
      return returnObj
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

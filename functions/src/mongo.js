const { MongoClient } = require('mongodb')
const uri = process.env.MONGODB_URI

async function connectToDatabase() {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db('SampleDatabase')
  return db
}

async function insertDocument(db, document) {
  const collection = db.collection('SampleCollection')
  const result = await collection.insertOne(document)
  console.log('Inserted document with _id:', result.insertedId)
}

async function StoreInDb(data) {
  const db = await connectToDatabase()
  await insertDocument(db, data)
}

module.exports = { StoreInDb }

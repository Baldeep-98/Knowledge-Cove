const { MongoClient } = require('mongodb')

let db;

async function connectToDb() {
    const client = new MongoClient(process.env.DB_URL);
    await client.connect();
    console.log('[Connected to MongoDB]');
    db = client.db('knowlegde-cove');
}

const getDB = () => db;

module.exports = { connectToDb, getDB };
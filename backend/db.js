const { MongoClient } = require('mongodb');

let db;

const getNextSequence = async (name) => {
    const result = await db.collection('counters').findOneAndUpdate(
        { _id: name },
        { $inc: { current: 1 } },
        { returnDocument: 'after' },
    );
    console.log(result);
    return result.value.current; 
};

async function connectToDb() {
    const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('[Connected to MongoDB]');
    db = client.db('knowlegde-cove');


}

const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
};

module.exports = { connectToDb, getDB, getNextSequence };

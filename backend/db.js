const { MongoClient } = require('mongodb')

let db;
const getNextSequence = async (name) => {
    const result = await db.collection('counters').findOneAndUpdate(
        { _id: name },
        { $inc: { current: 1 } },
        { returnDocument: 'after'},
    );
    console.log(result)
    return result.current;
};
async function connectToDb() {
    const client = new MongoClient(process.env.DB_URL);
    await client.connect();
    console.log('[Connected to MongoDB]');
    db = client.db('knowlegde-cove');
}

const getDB = () => db;

module.exports = { connectToDb, getDB,getNextSequence };
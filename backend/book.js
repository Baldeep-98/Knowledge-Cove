const { getDB } = require('./db.js');

const list = async () => {
  const db = getDB();
  try {
    const books = await db.collection('books').find({}).toArray();
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

module.exports = { list };

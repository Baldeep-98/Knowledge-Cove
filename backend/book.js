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
const getBook=async(parent,{book_id})=>{
    const db=getDB();
    const book=await db.collection('books').findOne({book_id});
    return book;
}

module.exports = { list, getBook };

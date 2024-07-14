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

const addToCart = async (parent, { book_id }) => {
  const db = getDB();
  const membership_num = 123; 
  const cartItem = { book_id, membership_num }; 
  const result = await db.collection("cart").insertOne(cartItem); // inserting a new cart item into 'cart' table

  if (!result.insertedId) {
    throw new Error("Failed to add to cart");
  }

  const savedItems = await db.collection("cart").findOne({ _id: result.insertedId }); // to get cart items

  return savedItems;
}

module.exports = { list, getBook,addToCart };

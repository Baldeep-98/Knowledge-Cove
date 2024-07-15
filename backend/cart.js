const { getDB } = require('./db.js');

const getCartItems = async () => {
  const db = getDB();
  const cartItems = await db.collection('cart').find({}).toArray();//fetch all books from cart table 

  for (let item of cartItems) {
    const bookDetails = await db.collection('books').findOne({ book_id: item.book_id });//fetching book details of selected item from the books table.
    item.bookDetails = bookDetails; //fetching book details 
  }

  return cartItems; //returning the selected items from cart with their details
};

module.exports = { getCartItems };

const { getDB } = require('./db.js');

const getCartItems = async (parent, { membership_num }) => {
  const db = getDB();
  const cartItems = await db.collection('cart').find({membership_num}).toArray(); //fetch all books from cart table 

  for (let item of cartItems) {
    const bookDetails = await db.collection('books').findOne({ book_id: item.book_id }); //fetching book details of selected item from the books table.
    item.bookDetails = bookDetails; //fetching book details 
  }

  return cartItems; //returning the selected items from cart with their details
};

const remove = async (parent, { cart_item }) => {
  const db = getDB();
  const cart = await db.collection('cart').findOne({ book_id: parseInt(cart_item.book_id), membership_num: cart_item.membership_num  });//find the item with book_id

  if (!cart) {
    // console.error(`Cart item with book_id ${book_id} not found`);//give error if no book with the id find 
    return false;
  }

  if (cart.current_status == 1) {
    return false;
  }

  const result = await db.collection('cart').deleteOne({  book_id: parseInt(cart_item.book_id), membership_num: cart_item.membership_num }); //if book find with that Id delete that
  return result.deletedCount === 1;
};

const clearCart = async(parent, { membership_num })=>{
  const db=getDB();
  const result=await db.collection('cart').deleteMany({ membership_num });
  return result.deletedCount>0;
}
module.exports = { getCartItems, remove ,clearCart};

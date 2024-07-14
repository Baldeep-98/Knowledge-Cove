const { getDB } = require("./db");

const list = async () => {
  const db = getDB();
  const books = await db.collection("books").find({}).toArray();
  return books;
};

const addToCart = async (parent, { book_id }) => {
  const db = getDB();
  const membership_id = 123; // Hardcoded membership_id
  const cartItem = { book_id, membership_id }; // creating the cart item object
  const result = await db.collection("cart").insertOne(cartItem); // inserting a new cart item into 'cart' collection

  if (!result.insertedId) {
    throw new Error("Failed to add to cart");
  }

  const savedItems = await db.collection("cart").findOne({ _id: result.insertedId }); // retrieving the cart item

  return savedItems;
};

module.exports = { addToCart, list };

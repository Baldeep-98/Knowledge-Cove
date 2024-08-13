const { getDB } = require('./db.js');

const list = async () => {
  const db = getDB();
  try {
    return await db.collection('books').find({}).toArray();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
const getBook = async (parent, { book_id }) => {
  const db = getDB();
  try {
    return await db.collection('books').findOne({ book_id });
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

const addBook = async (parent, { book }) => {
  const db = getDB();
  try {
    const result = await db.collection('books').insertOne(book);
    if (result.insertedCount === 0) {
      console.error('No book was added to the database.');
      return { success: false, message: 'Failed to add book to the database.' };
    }
    return { success: true, message: 'Book added successfully' };
  } catch (error) {
    console.error('Error adding book:', error);
    return { success: false, message: `Error adding book: ${error.message}` };
  }
};

const updateBook = async (parent, { book }) => {
  const db = getDB();
  try {
    const result = await db.collection('books').updateOne(
      { book_id: book.book_id },
      { $set: book }
    );
    if (result.matchedCount === 0) {
      console.error('No book found to update.');
      return { success: false, message: 'Failed to update book: Book not found.' };
    }
    return { success: true, message: 'Book updated successfully' };
  } catch (error) {
    console.error('Error updating book:', error);
    return { success: false, message: `Error updating book: ${error.message}` };
  }
};

const deleteBook = async (parent, { book_id }) => {
  const db = getDB();
  console.log(`Starting deletion process for book_id: ${book_id} (type: ${typeof book_id})`);
  try {
    
    const book = await db.collection('books').findOne({ book_id: parseInt(book_id, 10) });
    console.log(`Found book: ${JSON.stringify(book)}`);

    if (!book) {
      console.error('No book found to delete with that ID.');
      return false;
    }
    const result = await db.collection('books').deleteOne({ book_id: parseInt(book_id, 10) });
    console.log(`Delete result:`, result);

    if (result.deletedCount === 0) {
      console.error('No book was deleted.');
      return false;
    }

    console.log('Book deleted successfully.');
    return true;
  } catch (error) {
    console.error('Error during deletion:', error);
    return false;
  }
};



const addToCart = async (parent, { book_id }) => {
  const db = getDB();
  const membership_num = 123; 
  const cartItem = { book_id, membership_num }; 
  const result = await db.collection("cart").insertOne(cartItem); 

  if (!result.insertedId) {
    throw new Error("Failed to add to cart");
  }

  const savedItems = await db.collection("cart").findOne({ _id: result.insertedId }); 

  return savedItems;
};

module.exports = { list, getBook, addBook, updateBook, deleteBook, addToCart };

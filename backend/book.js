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

module.exports = { list, getBook, addBook, updateBook };
